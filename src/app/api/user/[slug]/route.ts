import { connectToDB } from "@/utilis/connectToDB";
import User from "@/utilis/models/User";
import { NextRequest, NextResponse } from "next/server"


export const GET = async(req:NextRequest, {params}: any) => {
    const email = params.slug
    console.log(email)

    
    try {
        await connectToDB();
        const userList = await User.findOne({email})
        return NextResponse.json(userList)
    } catch (error) {
        
    }
}