import  Listings  from '@/utilis/models/Listings'
import { connectToDB } from '@/utilis/connectToDB'
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import NotificationPreference from '@/utilis/models/NotificationPreference';
import { listingNotificationEmail } from '@/lib/functions/emails/listingNotificationEmail';

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
  accommodationTitle?:string;
  videoLink?: string;
  price?:number;
  phone?:number;
  accommodationType?:string;
  service?:string;
  propertyType?:string;
  property?:string;
  roommateName?:string;
  level?:string;
  gender?:string;
  email?:string
  name?:string;
  isFavorite?:string;
}




export const POST = async (request: any) => {
    const {
        category,
        image,
        institution,
        type,
        campus,
        description,
        accommodationTitle,
        videoLink,
        price,
        phone,
        accommodationType,
        service,
        propertyType,
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
      accommodationTitle,
      price,
      phone,
      accommodationType,
      videoLink,
      service,
      propertyType,
      property,
      roommateName,
      level,
      gender,
      name,
      email
    }
    if(category === 'accommodation'){
        delete formData.service;
        delete formData.propertyType;
        delete formData.property;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'service'){
        delete formData.accommodationTitle;
        delete formData.videoLink;
        delete formData.price;
        delete formData.accommodationType;
        delete formData.propertyType;
        delete formData.property;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'marketplace'){
        delete formData.accommodationTitle;
        delete formData.videoLink;
        delete formData.accommodationType;
        delete formData.service;
        delete formData.level;
        delete formData.gender;
        delete formData.roommateName;
      }
      if(category === 'roommate'){
        delete formData.accommodationTitle;
        delete formData.videoLink;
        delete formData.price;
        delete formData.accommodationType;
        delete formData.service;
        delete formData.propertyType;
        delete formData.property;
      }
    


    
    const newListing = new Listings(formData);
    try {
      console.log(newListing)
      await newListing.save();

      //extract id from saved listing to use for the notification
      const listingId = newListing._id.toString();
      
      // Send email notifications to users subscribed to this category
    if (category === 'accommodation' || category === 'roommate') {
      try {
        const subscribers = await NotificationPreference.find({ category, enabled: true });

        for (const sub of subscribers) {
          await listingNotificationEmail({
            user: {
              email: sub.email,
            },
            category,
            listing: {
              schoolName: institution || 'user',
              listingTitle: accommodationTitle || roommateName || 'New Listing',
              listingDescription: description || '',
              listingPrice: price ? `₦${price.toLocaleString()}` : undefined,
              listingLocation: campus || 'Unknown Location',
              listingUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${category}/${listingId}`,
            },
          });
        }

        console.log(`✅ Sent ${subscribers.length} emails`);
      } catch (err) {
        console.error('❌ Error sending emails:', err);
      }
    }


      return NextResponse.json('List Added', { status: 200 });
    } catch (error: any) {
      console.error("Error saving the listing:", error.message);
      return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
    }
    

}

export const GET = async (req:NextRequest) => {
  try {
    await connectToDB()
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type");
    const institution = searchParams.get("institution");
    const campus = searchParams.get("campus");

    const filters: any = {};
    if (institution) filters.institution = institution;
    if (campus) filters.campus = campus;
    if (type) filters.type = type;

    const listings = await Listings.find(filters).sort({ createdAt: -1 });

    return NextResponse.json(listings, {status:200})
  } catch (error:any) {
    return new NextResponse(error.message, {status: 500})
  }
}