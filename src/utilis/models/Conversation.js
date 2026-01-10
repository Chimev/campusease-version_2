// models/Conversation.js
// Add this to your existing models folder

import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing', // Reference to your Listing model
    required: true,
    index: true
  },
  listingTitle: String, // Cached for quick display
  listingImage: String, // Cached listing image URL
  listingOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  lastMessage: {
    text: String,
    timestamp: Date,
    senderId: mongoose.Schema.Types.ObjectId,
    senderName: String
  },
  unreadCount: {
    type: Map,
    of: Number, // userId -> count
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for finding conversations by listing and participants
conversationSchema.index({ listingId: 1, participants: 1 });
// Index for user's conversation list
conversationSchema.index({ participants: 1, updatedAt: -1 });

export default mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);
