import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export async function GET() {
  try {
    const galleryRef = doc(db, 'website_gallery', 'main');
    const docSnap = await getDoc(galleryRef);

    if (docSnap.exists()) {
      return NextResponse.json({ success: true, data: { images: docSnap.data().images } });
    } else {
      return NextResponse.json({ success: true, data: { images: [] } });
    }
  } catch (error) {
    console.error('Error in get-website-gallery API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
