import { NextResponse } from 'next/server';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export async function POST(req) {
  try {
    const data = await req.json();
    const productsCollection = collection(db, 'products');
    
    // If id is provided, we can use setDoc to maintain the same ID.
    if (data.id) {
      await setDoc(doc(db, 'products', data.id), data);
    } else {
      await addDoc(productsCollection, data);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error publishing product:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
