import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
  });

export const GET = async (req: NextRequest, { params }: any) => {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get("type");
  const institution = searchParams.get("institution");
  const campus = searchParams.get("campus");
  const slug = params?.slug;

  try {
    await connectToDB();

    // If no filters at all → fetch single listing by ID
    if (!type && !institution && !campus) {
      const listing = await Listings.findById(slug);
      if (!listing)
        return NextResponse.json({ message: "No listing Details found" }, { status: 404 });
      return NextResponse.json(listing);
    }

    // Otherwise → build dynamic filter object
    const filters: any = {};
    if (slug) filters.category = slug;
    if (institution) filters.institution = institution;
    if (campus) filters.campus = campus;
    if (type) filters.type = type;

    const listings = await Listings.find(filters).sort({ createdAt: -1 });

    if (!listings.length) {
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(listings);
  } catch (error: any) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};


export const DELETE = async (req: NextRequest, { params }: any) => {
    const id = params.slug
    
    try {
        await connectToDB(); // Ensure the DB connection is established
        
        // Find the listing by ID
        const listing = await Listings.findById(id); // Corrected from find(id)
        
        if (!listing) {
            return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
        }
    
        
        // Delete Cloudinary images (parallel)
        if (listing.image && listing.image.length > 0) {
          const deletePromises = listing.image.map((img: any) => {
            if (!img?.publicId) return null;
            return cloudinary.uploader.destroy(img.publicId, { resource_type: "image" });
          });

          // Run all deletions together
          await Promise.all(deletePromises);
        }
    
        // Delete the listing from the database
        await Listings.findByIdAndDelete(id);
    
        return NextResponse.json({ message: "Listing deleted" }, { status: 200 }); // Use status 200 for successful deletion
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500 }
        );
    }
}

export const PATCH = async (req: NextRequest, {params}: any) => {
    const body = await req.json()
    const id = params.slugListings

    await connectToDB();

    try {
        const listing = await Listings.findOne({_id : id});

        if (!listing) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

          // Update listing with the new data from the body
          Object.assign(listing, body); // Update listinig fields with the provided data
          await listing.save(); // Save the updated llisting
          return NextResponse.json({ message: "Updated" }, { status: 200 });
    }catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}