import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server";

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
    } catch (error) {
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
