import mongoose from "mongoose";

const { Schema } = mongoose;





const NotificationPreferenceSchema = new Schema(
{
  email: {
    type: String,
    required: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true,
  },
}, {timestamps: true,}
);

export default mongoose.models.NotificationPreference || mongoose.model("NotificationPreference", NotificationPreferenceSchema)
