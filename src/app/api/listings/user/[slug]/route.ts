import { connectToDB } from "@/utilis/connectToDB";
import Listings from "@/utilis/models/Listings";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest, { params }: any) => {
  const email = params.slug;

  try {
    await connectToDB();
    const userList = await Listings.find({ email });

    if (!userList.length) {
      return NextResponse.json(
        { message: "No listings found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(userList, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings: ", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
};
