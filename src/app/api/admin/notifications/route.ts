import { connectToDB } from "@/utilis/connectToDB";
import NotificationPreference from "@/utilis/models/NotificationPreference";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    // const session = await getServerSession(authOptions);
    // if (!session?.user?.email) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // const { searchParams } = new URL(request.url);
    // const category = searchParams.get('category');

    // if (!category) {
    //   return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    // }

    const notifications = await NotificationPreference.find(
    //   {
    //   category,
    // }
  );

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching preference:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}