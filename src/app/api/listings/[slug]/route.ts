import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    secure:true
  });

export const GET = async (req: NextRequest, { params }: any) => {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("type");
    const institution = searchParams.get("institution");
    const campus = searchParams.get("campus");
    const slug = params?.slug;  // category slug from URL
    // const listingId = params?.slug; 

    try {
        await connectToDB();

        if(!type && !institution && !campus){
            const listDetails = await Listings.findById({_id: slug})

            if(!listDetails){
                return new NextResponse(JSON.stringify({message: "No Listing Found"}), {status:404})
            }

            return NextResponse.json(listDetails)
        }else{
            const categoryList = await Listings.find({
                category: slug,
                institution,
                campus,
                type
            }).sort({ createdAt: -1 });
            // .limit(50); 
             // Consider limiting results for better performance
    
            if (!categoryList.length) {
                return new NextResponse(JSON.stringify({ message: "No listings found" }), { status: 404 });
            }
    
            return NextResponse.json(categoryList);
        }
    } catch (error:any) {
        console.error("Error fetching listings:", {
            message: error.message,
            stack: error.stack,
            params: { slug, type, institution, campus }
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
                if(!img){
                    continue;
                }

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

export const PATCH = async (req: NextRequest, {params}: any) => {
    const body = await req.json()
    const id = params.slug

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