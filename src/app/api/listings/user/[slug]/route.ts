import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest, { params }: any) => {
  const searchParam = params.slug;  // Could be either email or name

  try {
    await connectToDB();
    
    let userList;

    // Check if the searchParam contains an '@' to determine if it's an email
    if (searchParam.includes('@')) {
      // Search by email
      userList = await Listings.find({ email: searchParam });
    } else {
      // Search by name (Case-insensitive, and partial match)
      userList = await Listings.find({ name: new RegExp(searchParam, 'i') });
    }

    if (!userList.length) {
      return NextResponse.json(
        { message: "No listings found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(userList, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching listings: ", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
};
