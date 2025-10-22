import { connectToDB } from "@/utilis/connectToDB";
import User from "@/utilis/models/User";
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

         const users = await User.find({
            $or: [{name: regex}, {email: regex}]
         }).select("name email role school agentApproval createdAt");
         
         return NextResponse.json({users});

    } catch (error) {
        console.error("User search error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}