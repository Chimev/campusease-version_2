// models/Message.js
// Add this to your existing models folder

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
    index: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderName: String,
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  readBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

messageSchema.index({ conversationId: 1, timestamp: -1 });

// Auto-delete messages after 30 days
messageSchema.index({ timestamp: 1 }, { 
  expireAfterSeconds: 2592000 // 30 days
});

export default mongoose.models.Message || mongoose.model('Message', messageSchema);