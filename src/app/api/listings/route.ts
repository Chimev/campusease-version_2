import  Listings  from '@/utilis/models/Listings'
import { connectToDB } from '@/utilis/connectToDB'
import { NextRequest, NextResponse } from 'next/server';

interface FormData {
  category?:string;
  image?: string[];
  institution?:string;
  type?:string;
  campus?:string;
  description?:string;
  accommodationName?:string;
  price?:number;
  phone?:number;
  accommodationType?:string;
  service?:string;
  property?:string;
  roommateName?:string;
  level?:string;
  gender?:string;
  email:string;
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
        price,
        phone,
        accommodationType,
        service,
        property,
        roommateName,
        level,
        gender,
        email,
    } = await request.json();

    await connectToDB();

    const formData: FormData = {
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
        service,
        property,
        roommateName,
        level,
        gender,
        email
    }
    if(category === 'Accommodation'){
        delete formData.service;
        delete formData.property;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'Service'){
        delete formData.accommodationName;
        delete formData.price;
        delete formData.accommodationType;
        delete formData.property;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'Property'){
        delete formData.accommodationName;
        delete formData.accommodationType;
        delete formData.service;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'Roommate'){
        delete formData.accommodationName;
        delete formData.price;
        delete formData.accommodationType;
        delete formData.service;
        delete formData.property;
      }
    

    
    const newListing = new Listings(formData);
    console.log(newListing)
    try {
      await newListing.save();
      return NextResponse.json('List Added', { status: 200 });
    } catch (error: any) {
      console.error("Error saving the listing:", error.message);
      return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
    

}