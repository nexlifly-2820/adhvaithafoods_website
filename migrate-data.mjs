import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import products data
import { ALL_PRODUCTS } from './components/productsData.js';

// Read recipes data as string to bypass JSX parse errors in Node
const recipesFileContent = fs.readFileSync(path.join(__dirname, 'app/recipes/page.js'), 'utf-8');
const fallbackRecipesMatch = recipesFileContent.match(/const FALLBACK_RECIPES = \[([\s\S]*?)\];/);

let FALLBACK_RECIPES = [];
if (fallbackRecipesMatch) {
  // Use Function to safely evaluate the array string
  const arrayString = `[${fallbackRecipesMatch[1]}]`;
  // Replace missing references or complex JS with plain text if needed, 
  // but FALLBACK_RECIPES is mostly plain objects.
  try {
    FALLBACK_RECIPES = (new Function(`return ${arrayString}`))();
  } catch(e) {
    console.error("Error evaluating recipes:", e);
  }
}

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

function formatCategory(category) {
  if (!category) return "PREPARED_FOODS";
  const cat = category.toUpperCase().replace(/[, ]+/g, '_').replace(/-/g, '_').replace(/&/g, '');
  if (cat.includes('SALTS_SPICES_SOUPS')) return 'SALT_SPICES_&_SOUPS';
  if (cat.includes('READY_TO_EAT_SAVOURIES')) return 'READY_TO_EAT';
  if (cat.includes('INDIAN_SWEETS_SNACKS')) return 'INDIAN_SWEETS_&_SNACKS';
  if (cat.includes('PREPARED_FOODS')) return 'PREPARED_FOODS';
  return cat;
}

const productsToInsert = ALL_PRODUCTS.map(item => {
  return {
    // id: item.id, // Better to let backend generate ID or we can pass it
    id: item.id,
    images: item.img ? [item.img] : [],
    category: formatCategory(item.category),
    maxQuantity: { value: "20", unit: "kg" },
    productName: item.name,
    productDescription: item.desc || "",
    minQuantity: { value: "250", unit: "grams" }
  };
});

const recipesToInsert = FALLBACK_RECIPES.map(item => {
  return {
    id: item.id,
    category: item.category ? item.category.toLowerCase() : "prepared foods",
    difficulty: item.level ? item.level.toLowerCase() : "medium",
    images: item.img ? [item.img] : [],
    ingredients: item.ingredients || [],
    makingProcess: item.method || "",
    makingTime: { unit: "minutes", value: item.time ? item.time.replace(/\D/g, '') || "10" : "10" },
    recipeDescription: item.desc || "",
    recipeName: item.name
  };
});

async function run() {
  console.log(`Starting migration... targeting ${API_BASE_URL}`);
  
  // 1. Publish Products
  for (const product of productsToInsert) {
    try {
      const res = await fetch(`${API_BASE_URL}/website/api/publish-website-products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      console.log(`Product ${product.productName} -> ${res.status}`);
    } catch (e) {
      console.error(`Failed to post product ${product.productName}:`, e.message);
    }
  }

  // 2. Publish Recipes
  for (const recipe of recipesToInsert) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/publish-website-recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      });
      console.log(`Recipe ${recipe.recipeName} -> ${res.status}`);
    } catch (e) {
      console.error(`Failed to post recipe ${recipe.recipeName}:`, e.message);
    }
  }

  console.log("Migration complete!");
}

run();
