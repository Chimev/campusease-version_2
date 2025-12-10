import Listings from '@/utilis/models/Listings'
import { connectToDB } from '@/utilis/connectToDB'
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import NotificationPreference from '@/utilis/models/NotificationPreference';
import { listingNotificationEmail } from '@/lib/functions/emails/listingNotificationEmail';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

interface ImageData {
  url: string;
  publicId: string;
}

interface FormData {
  category?: string;
  image: ImageData[];
  institution?: string;
  type?: string;
  campus?: string;
  description?: string;
  accommodationTitle?: string;
  videoLink?: string;
  price?: number;
  phone?: number;
  accommodationType?: string;
  service?: string;
  propertyType?: string;
  property?: string;
  roommateName?: string;
  level?: string;
  gender?: string;
  email?: string;
  name?: string;
  isFavorite?: string;
}

export const POST = async (request: NextRequest) => {
  try {
    // Parse JSON body instead of FormData
    const body = await request.json();

    // Extract all fields from JSON body
    const {
      category,
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
      image // This now comes as an array of {url, publicId} objects
    } = body;


    await connectToDB();

    // Build listing data object
    const listingData: FormData = {
      isFavorite,
      category,
      image, // Already uploaded to Cloudinary from frontend
      institution,
      type,
      campus,
      description,
      accommodationTitle,
      price: price ? Number(price) : undefined,
      phone: phone ? Number(phone) : undefined,
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



