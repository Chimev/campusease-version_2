

import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
  });

export const DELETE = async (req: NextRequest, { params }: any) => {
  const publicId = params.publicId;

  try {
    if (!publicId) {
      return NextResponse.json({ message: 'No publicId provided' }, { status: 400 });
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
    return NextResponse.json({ message: 'Image deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
