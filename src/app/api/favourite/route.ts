import { connectToDB } from "@/utilis/connectToDB";
import Favorite from "@/utilis/models/Favorite";
import { NextRequest, NextResponse } from "next/server";

// ======================================
export const POST = async (request: NextRequest ) => {
  try {
    await connectToDB();

    const { email, listingId } = await request.json();

    if (!email || !listingId) {
      return NextResponse.json(
        { message: "Email and listingId are required" },
        { status: 400 }
      );
    }

    // Prevent duplicate favorites
    const exists = await Favorite.findOne({ email, listingId });

    if (exists) {
      return NextResponse.json(
        { message: "Already favorited", favorite: exists },
        { status: 200 }
      );
    }

    // Create new favorite
    const favorite = await Favorite.create({ email, listingId });

    return NextResponse.json(
      { message: "Favorite added", favorite },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
};