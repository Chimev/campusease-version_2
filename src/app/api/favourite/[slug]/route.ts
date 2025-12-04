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
export const DELETE = async (_req: NextRequest, { params }: any) => {
  const id = params.slug;

  try {
    await connectToDB();

    const favorite = await Favorite.findById(id);
    if (!favorite) {
      return NextResponse.json({ message: "Favorite not found" }, { status: 404 });
    }

    await Favorite.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Favorite deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};

// ======================================
// POST /api/favorites
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
