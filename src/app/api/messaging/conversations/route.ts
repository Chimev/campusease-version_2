import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/auth';
import { connectToDB } from '@/utilis/connectToDB';
import Conversation from '@/utilis/models/Conversation';
import { NextRequest } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDB();

    const conversations = await Conversation.find({
      participants: session.user.id
    })
    .populate('participants', 'name') // Adjust fields based on your User model
    .sort({ updatedAt: -1 })
    .limit(50);

    return Response.json({ conversations });
  } catch (error) {
    console.error('Get conversations error:', error);
    return Response.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

// POST - Create or get existing conversation for a listing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { listingId, listingOwnerId } = await request.json();
    
    if (!listingId || !listingOwnerId) {
      return Response.json({ error: 'listingId and listingOwnerId required' }, { status: 400 });
    }

    // User can't chat with themselves
    if (session.user.id === listingOwnerId) {
      return Response.json({ error: 'Cannot chat with yourself' }, { status: 400 });
    }

    await connectToDB();

    // Check if conversation already exists for this listing between these users
    let conversation = await Conversation.findOne({
      listingId,
      participants: { 
        $all: [session.user.id, listingOwnerId],
        $size: 2
      }
    })
    .populate('participants', 'name')
    .populate('listingId', 'title images price'); // Adjust fields based on your Listing model

    // Create new conversation if doesn't exist
    if (!conversation) {
      // Fetch listing details to cache
      const Listing = (await import('@/utilis/models/Listings')).default;
      const listing = await Listing.findById(listingId);
      
      if (!listing) {
        return Response.json({ error: 'Listing not found' }, { status: 404 });
      }

      conversation = await Conversation.create({
        listingId,
        listingTitle: listing.title,
        listingImage: listing.images?.[0] || null,
        listingOwnerId,
        participants: [session.user.id, listingOwnerId]
      });
      
      conversation = await conversation
        .populate('participants', 'name email image')
        .populate('listingId', 'title images price');
    }

    return Response.json({ conversation });
  } catch (error) {
    console.error('Create conversation error:', error);
    return Response.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}
