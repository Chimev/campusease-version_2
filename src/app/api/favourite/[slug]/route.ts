import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utilis/connectToDB";
import Favorite from "@/utilis/models/Favorite";

// ======================================
// GET /api/favorites/[email]
// ======================================
export const GET = async (_req: NextRequest, { params }: any) => {
  const email = params.slug;

  try {
    await connectToDB();

    const favorites = await Favorite.find({ email });

    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
};

// ======================================
// DELETE /api/favorites/[favoriteId]
// ======================================
export const DELETE = async (req: NextRequest, { params }: any) => {
  const listingId = params.slug; // This will be the listingId now
  const {email} = await req.json();
  try {
    await connectToDB();

    // Find the favorite by listingId 
    const favorite = await Favorite.findOne({ listingId, email });
    
    if (!favorite) {
      return NextResponse.json({ message: "Favorite not found" }, { status: 404 });
    }

    // Delete using the found favorite's _id
    await Favorite.findByIdAndDelete(favorite._id);

    return NextResponse.json(
      { message: "Favorite deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};
