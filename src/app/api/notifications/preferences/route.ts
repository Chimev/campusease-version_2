import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // for auth check
import { connectToDB } from '@/utilis/connectToDB';
import { authOptions } from '../../auth/[...nextauth]/auth';
import NotificationPreference from '@/utilis/models/NotificationPreference'

export async function POST(request: NextRequest) {
  try {
    // Connect to DB
    await connectToDB();

    // Get logged-in user session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { category, enabled } = body;

    if (typeof category !== 'string' || typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Fetch existing preference
    const existingPref = await NotificationPreference.findOne({
      email: session.user.email,
      category,
    });

    // Delete only if the notification exists
    if (existingPref?.enabled === true) {
      const deletedPref = await NotificationPreference.findOneAndDelete({
        email: session.user.email,
        category,
      });
      return NextResponse.json({ success: true, deleted: deletedPref });
    }

    // Upsert preference for this user and category
    const updatedPref = await NotificationPreference.findOneAndUpdate(
      { email: session.user.email, category },
      { enabled },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, preference: updatedPref });
  } catch (error) {
    console.error('Error saving notification preference:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}



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