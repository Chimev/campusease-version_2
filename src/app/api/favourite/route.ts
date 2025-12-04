import { NextRequest, NextResponse } from "next/server";
import  Favorite  from '@/utilis/models/Favorite'
//using the same as listings
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

export const POST  = async(request: NextRequest) => {

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
    } = await request.json()

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

      const favorites = new Favorite(formData)
      try {
        await favorites.save();
        return NextResponse.json('Favorite Added', {status:200})
      } catch (error:any) {
        return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
      }
}


