import fs from 'fs';
import path from 'path';

const dir = 'C:/Users/revre/OneDrive/Desktop/Flutter_repos/adhvaithafoods_website/public/images/products';
const files = fs.readdirSync(dir);

const API_BASE_URL = 'http://localhost:3001';

function formatCategory(name) {
  const lower = name.toLowerCase();
  if (lower.includes('pickle') || lower.includes('avakaya') || lower.includes('uppava') || lower.includes('pandu mirchi')) return 'PREPARED_FOODS';
  if (lower.includes('powder') || lower.includes('masala') || lower.includes('karam') || lower.includes('podi') || lower.includes('murmura')) return 'SALT_SPICES_&_SOUPS';
  if (lower.includes('laddu') || lower.includes('patti') || lower.includes('jamun') || lower.includes('chekki')) return 'INDIAN_SWEETS_&_SNACKS';
  if (lower.includes('chips') || lower.includes('snacks') || lower.includes('bundhi') || lower.includes('chakinalu') || lower.includes('chakodi') || lower.includes('mixture') || lower.includes('papad') || lower.includes('whills') || lower.includes('chudwa')) return 'READY_TO_EAT';
  return 'PREPARED_FOODS';
}

function toTitleCase(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function run() {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let name = file;
    let desc = "";
    
    // Parse name and description
    if (file.includes('(') && file.includes(')')) {
      const parts = file.split('(');
      name = parts[0].replace(/_/g, ' ').trim();
      desc = parts[1].split(')')[0].replace(/_/g, ' ').trim();
    } else {
      name = file.split('.')[0].replace(/[-_]/g, ' ').trim();
      name = toTitleCase(name);
      desc = `Premium ${name}.`;
    }
    
    name = toTitleCase(name);
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    const product = {
      id: `img-${slug}`,
      images: [`/images/products/${file}`],
      category: formatCategory(name),
      maxQuantity: { value: "20", unit: "kg" },
      productName: name,
      productDescription: desc,
      minQuantity: { value: "250", unit: "grams" }
    };
    
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
}

run();
