import { connectToDB } from "@/utilis/connectToDB";
import NotificationPreference from "@/utilis/models/NotificationPreference";
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

         const notification = await NotificationPreference.find({email: regex}).select("email category createdAt");
         
         return NextResponse.json({notification});

    } catch (error) {
        console.error("Notification search error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}