import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export async function GET() {
  try {
    const recipesCollection = collection(db, 'recipes');
    const snapshot = await getDocs(recipesCollection);
    
    const recipes = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data
      };
    });

    return NextResponse.json({ success: true, data: recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
