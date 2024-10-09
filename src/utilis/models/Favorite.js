import mongoose from "mongoose";
const { Schema } = mongoose;

const FavoriteSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
        image: {
            type: [String],
        },
        institution: {
            type: String,
            required: true,
        },
        campus: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        accommodationName: {
            type: String,
        },
        price: {
            type: Number,
        },
        phone: {
            type: Number,
        },
        accommodationType: {
            type: String
        },
        service: {
            type: String,
        },
        property: {
            type: String,
        },
        roommateName: {
            type: String,
        },
        level: {
            type: String
        },
        gender: {
            type: String,
        }
    },
    {timestamps: true}
);

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
