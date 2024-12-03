import { connectToDB } from "@/utilis/connectToDB";
import Schools from "@/utilis/models/Schools";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    const {
        type,
        school,
        campuses
    } = await req.json();
    await connectToDB();

    const newSchool = new Schools({
        type,
        school,
        campuses,
    })

    try {
        await newSchool.save();
        return  NextResponse.json({message: "Successfully Added School"}, {status: 200})
    } catch (error) {
        throw new Error("Sorry there was an Error");
        
    }
  
};

export const GET = async(req:NextRequest) => {
    await connectToDB()

    try {
        const schools = await Schools.find()
        return NextResponse.json(schools)
    } catch (error) {
        throw new Error("Error while fetching");
        
    }
}