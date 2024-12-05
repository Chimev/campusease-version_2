import { connectToDB } from "@/utilis/connectToDB";
import User from "@/utilis/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: any) => {
    const searchParam = params.slug;  // Either email or name
    console.log(searchParam);

    try {
        await connectToDB();

        let userList;

        // Check if the searchParam contains an '@' symbol to determine if it's an email
        if (searchParam.includes('@')) {
            // Search by email
            userList = await User.findOne({ email: searchParam });
        } else {
            // Search by name (Assuming case-insensitive and partial match search)
            userList = await User.findOne({ name: new RegExp(searchParam, 'i') });
        }

        if (!userList) {
            return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        return NextResponse.json(userList);
    } catch (error: any) {
        console.error("Error fetching user:", {
            message: error.message,
            stack: error.stack,
            params: { searchParam }
        });
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500 }
        );
    }
};

export const PATCH =async (req:NextRequest) => {
    const body = await req.json();

    await connectToDB();
    try {
        const user = await User.findOne({name: body.name});
        // if (user.name === body.name) {
        //     return NextResponse.json({ message: "Name is already in use"}, { status: 400 });
        // }
        Object.assign(user, body);//updates the user data with provided data;
        await user.save(); // Save the updated llisting
        return NextResponse.json({ message: "Updated" }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    
}
