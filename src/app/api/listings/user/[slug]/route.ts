import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server"


export const GET = async(req:NextRequest, {params}: any) => {
    const email = params.slug
    console.log(email)

    
    try {
        await connectToDB();
        const userList = await Listings.find({email})
        return NextResponse.json(userList)
    } catch (error) {
        
    }
}