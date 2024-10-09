import { connectToDB } from "@/utilis/connectToDB"
import Favorite from "@/utilis/models/Favorite";
import { NextRequest, NextResponse } from "next/server"

export const GET = async(_req: NextRequest, {params}: any) => {
    const email = params.slug
    

    try {
        await connectToDB();
        const favorites = await Favorite.find({email})

        if (!favorites.length) {
            return NextResponse.json(
              { message: "No listings found for this user." },
              { status: 404 }
            );
          }
          return NextResponse.json(favorites, { status: 200 });
    } catch (error) {
        console.error("Error fetching Favorites: ", error);
        return NextResponse.json(
        { error: "Failed to fetch Favorites" },
        { status: 500 }
        );
    }
}

export const DELETE = async(_req:NextRequest, {params}:any) => {
  const id = params.slug

  try {
    await connectToDB();

    const favorite = await Favorite.findById(id);
    if (!favorite) {
      return NextResponse.json({ message: 'Listing not found' }, { status: 404 });
  }
  await Favorite.findByIdAndDelete(id);
  return NextResponse.json({message:"Favourite Delted"}, {status: 200})
  } catch (error:any) {
    return new NextResponse(
      JSON.stringify({error: error.message, message:"Internal Server Error"}),
      {status: 500}
    )
  }
}