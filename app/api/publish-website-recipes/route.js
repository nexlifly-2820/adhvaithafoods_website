import { NextResponse } from 'next/server';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export async function POST(req) {
  try {
    const data = await req.json();
    const recipesCollection = collection(db, 'recipes');
    
    if (data.id) {
      await setDoc(doc(db, 'recipes', data.id), data);
    } else {
      await addDoc(recipesCollection, data);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error publishing recipe:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
