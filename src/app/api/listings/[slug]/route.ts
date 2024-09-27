import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  });

export const GET = async (req: NextRequest, { params }: any) => {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type");
    const institution = searchParams.get("institution");
    const campus = searchParams.get("campus");
    const category = params.slug;  // category slug from URL

    console.log({ type, institution, campus, category });

    try {
        await connectToDB();
        
        const categoryList = await Listings.find({
            category,
            institution,
            campus,
            type
        })
        // .limit(50); 
         // Consider limiting results for better performance

        if (!categoryList.length) {
            return new NextResponse(JSON.stringify({ message: "No listings found" }), { status: 404 });
        }

        return NextResponse.json(categoryList);
    } catch (error:any) {
        console.error("Error fetching listings:", {
            message: error.message,
            stack: error.stack,
            params: { category, type, institution, campus }
        });
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
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
    
        // Delete associated images from Cloudinary
        if (listing.image && listing.image.length > 0) { // Corrected typo 'lemgth'
            for (const img of listing.image) {
                const publicId = img.split('/').pop()?.split('.')[0]; // Extract public ID from URL
                
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId); // Destroy the image in Cloudinary
                }
            }
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