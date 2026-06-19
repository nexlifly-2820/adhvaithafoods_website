import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export async function GET() {
  try {
    const productsCollection = collection(db, 'products');
    const snapshot = await getDocs(productsCollection);
    
    const products = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.productName || 'Unnamed Product',
        desc: data.productDescription || '',
        category: data.category || 'Prepared Foods',
        img: data.images && data.images.length > 0 ? data.images[0] : 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
        rating: 5,
        reviews: Math.floor(Math.random() * 100) + 10,
        ...data
      };
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error in get-website-products API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
