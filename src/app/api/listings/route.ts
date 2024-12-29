import  Listings  from '@/utilis/models/Listings'
import { connectToDB } from '@/utilis/connectToDB'
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure:true
});

interface FormData {
  category?:string;
  image?: string[];
  institution?:string;
  type?:string;
  campus?:string;
  description?:string;
  accommodationName?:string;
  videoLink?: string;
  price?:number;
  phone?:number;
  accommodationType?:string;
  service?:string;
  property?:string;
  roommateName?:string;
  level?:string;
  gender?:string;
  email?:string
  name?:string;
  isFavorite?:string;
}


// export const GET = async () => {
//   //
//   const res = listings;

//   return  Response.json(res)
// }


export const POST = async (request: any) => {
    const {
        category,
        image,
        institution,
        type,
        campus,
        description,
        accommodationName,
        videoLink,
        price,
        phone,
        accommodationType,
        service,
        property,
        roommateName,
        level,
        gender,
        name,
        email,
        isFavorite,
    } = await request.json();

    await connectToDB();

    // //Upload images to Cloudinary and collect URLs
    // const uploadedImages = [];
    // for (const img of image) {
    //   const result = await cloudinary.uploader.upload(img, {
    //     folder: "campusEase", //OPtional
    //   });
    //   uploadedImages.push(result.secure_url);
    // }

    const formData: FormData = {
      isFavorite,
      category,
      image,
      institution,
      type,
      campus,
      description,
      accommodationName,
      price,
      phone,
      accommodationType,
      videoLink,
      service,
      property,
      roommateName,
      level,
      gender,
      name,
      email
    }
    if(category === 'accommodation'){
        delete formData.service;
        delete formData.property;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'service'){
        delete formData.accommodationName;
        delete formData.videoLink;
        delete formData.price;
        delete formData.accommodationType;
        delete formData.property;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'marketplace'){
        delete formData.accommodationName;
        delete formData.videoLink;
        delete formData.accommodationType;
        delete formData.service;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'roommate'){
        delete formData.accommodationName;
        delete formData.videoLink;
        delete formData.price;
        delete formData.accommodationType;
        delete formData.service;
        delete formData.property;
      }
    


    
    const newListing = new Listings(formData);
    try {
      console.log(newListing)
      await newListing.save();
      return NextResponse.json('List Added', { status: 200 });
    } catch (error: any) {
      console.error("Error saving the listing:", error.message);
      return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
    

}