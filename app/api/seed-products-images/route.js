import { NextResponse } from 'next/server';
import { db, app } from '@/firebase';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ALL_PRODUCTS } from '@/components/productsData';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        console.log("Starting seeding process...");
        
        // 1. Delete existing products
        const productsCollection = collection(db, 'products');
        const snapshot = await getDocs(productsCollection);
        
        console.log(`Deleting ${snapshot.docs.length} existing products...`);
        const deletePromises = snapshot.docs.map(docSnapshot => 
            deleteDoc(doc(db, 'products', docSnapshot.id))
        );
        await Promise.all(deletePromises);
        console.log("Deleted all old products.");

        // 2. Upload images & insert 57 products
        const storage = getStorage(app);
        console.log("Uploading images and seeding 57 products...");
        
        let count = 0;
        for (const product of ALL_PRODUCTS) {
            let downloadUrl = '';
            if (product.img) {
                try {
                    const localPath = path.join(process.cwd(), 'public', product.img);
                    if (fs.existsSync(localPath)) {
                        const fileBuffer = fs.readFileSync(localPath);
                        const fileName = path.basename(product.img);
                        const storageRef = ref(storage, `products/${fileName}`);
                        
                        console.log(`Uploading ${fileName}...`);
                        await uploadBytes(storageRef, new Uint8Array(fileBuffer), { contentType: 'image/jpeg' });
                        downloadUrl = await getDownloadURL(storageRef);
                        console.log(`Uploaded ${fileName}: ${downloadUrl}`);
                    } else {
                        console.warn(`File not found: ${localPath}`);
                    }
                } catch (e) {
                    console.error('Upload failed for', product.img, e);
                }
            }
            
            const productData = {
                id: product.id,
                category: product.category,
                maxQuantity: { value: "20", unit: "kg" },
                productName: product.name,
                productDescription: product.desc || "",
                minQuantity: { value: "250", unit: "grams" },
                images: downloadUrl ? [downloadUrl] : []
            };
            
            await setDoc(doc(db, 'products', product.id), productData);
            count++;
        }
        
        console.log(`Seeding complete. Inserted ${count} products.`);
        return NextResponse.json({ success: true, message: `Reverted and seeded ${count} products with Firebase URLs.` });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
