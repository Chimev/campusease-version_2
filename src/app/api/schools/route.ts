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
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type')

    try {
        if(!type){
            const schools = await Schools.find()
            // console.log('sch:',schools)
            return NextResponse.json(schools)
        }else{
            const schools = await Schools.find({type})
             console.log('sch:',schools)
            return NextResponse.json(schools)
        }
        
    } catch (error) {
        throw new Error("Error while fetching");
        
    }
}