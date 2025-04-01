import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
          },
        school: {
            type: String,
            required: true
        },
        role: {
            type: [String],
            required: true
        },
        
        agentApproval: {
            type: Boolean,
            required: false
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);


export default mongoose.models.User || mongoose.model("User", userSchema);