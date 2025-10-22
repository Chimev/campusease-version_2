import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (req: NextRequest ) => {

    try {
         await connectToDB();

         const searchParams = req.nextUrl.searchParams
         const q = searchParams.get("q")

         if(!q){
            return NextResponse.json({message: "No search query provided"}, {status: 400});
         }

         const regex = new RegExp(q, 'i')

         const listings = await Listings.find({
            $or: [{name: regex}, {email: regex}]
         }).select("name email category school status campus createdAt");
         
         return NextResponse.json({listings});

    } catch (error) {
        console.error("Listing search error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}