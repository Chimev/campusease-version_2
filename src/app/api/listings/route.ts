import  Listings  from '@/utilis/models/Listings'
import { connectToDB } from '@/utilis/connectToDB'
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import NotificationPreference from '@/utilis/models/NotificationPreference';
import { listingNotificationEmail } from '@/lib/functions/emails/listingNotificationEmail';
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:true
});

interface FormData {
  category?:string;
  image: [
    {
      url: string,
      publicId: string
    }
  ];

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



export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    // Extract all form fields
    const category = formData.get('category') as string;
    const institution = formData.get('institution') as string;
    const type = formData.get('type') as string;
    const campus = formData.get('campus') as string;
    const description = formData.get('description') as string;
    const accommodationTitle = formData.get('accommodationTitle') as string;
    const videoLink = formData.get('videoLink') as string;
    const price = formData.get('price') ? Number(formData.get('price')) : undefined;
    const phone = formData.get('phone') ? Number(formData.get('phone')) : undefined;
    const accommodationType = formData.get('accommodationType') as string;
    const service = formData.get('service') as string;
    const propertyType = formData.get('propertyType') as string;
    const property = formData.get('property') as string;
    const roommateName = formData.get('roommateName') as string;
    const level = formData.get('level') as string;
    const gender = formData.get('gender') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const isFavorite = formData.get('isFavorite') as string;

    // Get all uploaded images
    const images = formData.getAll('images') as File[];

    if (!images || images.length < 5) {
      return NextResponse.json(
        { message: 'Please upload at least 5 images' },
        { status: 400 }
      );
    }

    await connectToDB();

    // Convert File → Cloudinary upload (stream)
    const uploadToCloudinary = (file: File) => {
      return new Promise((resolve, reject) => {
        const upload = cloudinary.uploader.upload_stream(
          {
            folder: "campusEase",
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        file.arrayBuffer().then((ab) => {
          const buffer = Buffer.from(ab);
          Readable.from(buffer).pipe(upload);
        });

       
      });
    };

    // Upload all images *in parallel*
    const uploadPromises = images.map((img) => uploadToCloudinary(img));
    const cloudinaryResults = await Promise.all(uploadPromises);

    const uploadedImages:any = cloudinaryResults.map((r: any) => ({ url: r.secure_url, publicId: r.public_id }));



    // Build form data object
    const listingData: FormData = {
      isFavorite,
      category,
      image: uploadedImages,
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
    };

    // Remove irrelevant fields based on category
    if (category === 'accommodation') {
      delete listingData.service;
      delete listingData.propertyType;
      delete listingData.property;
      delete listingData.level;
      delete listingData.gender;
      delete listingData.roommateName;
    }
    if (category === 'services') {
      delete listingData.accommodationTitle;
      delete listingData.videoLink;
      delete listingData.price;
      delete listingData.accommodationType;
      delete listingData.propertyType;
      delete listingData.property;
      delete listingData.level;
      delete listingData.gender;
      delete listingData.roommateName;
    }
    if (category === 'marketplace') {
      delete listingData.accommodationTitle;
      delete listingData.videoLink;
      delete listingData.accommodationType;
      delete listingData.service;
      delete listingData.level;
      delete listingData.gender;
      delete listingData.roommateName;
    }
    if (category === 'roommates') {
      delete listingData.accommodationTitle;
      delete listingData.videoLink;
      delete listingData.price;
      delete listingData.accommodationType;
      delete listingData.service;
      delete listingData.propertyType;
      delete listingData.property;
    }

    const newListing = new Listings(listingData);
    await newListing.save();

    // Extract id from saved listing to use for the notification
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

    return NextResponse.json({ message: 'List Added', listingId }, { status: 200 });
  } catch (error: any) {
    console.error("Error saving the listing:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

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