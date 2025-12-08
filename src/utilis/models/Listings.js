import mongoose from "mongoose";
const { Schema } = mongoose;

const listingsSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        category:{
            type: String,
            required: true,
        },
        image: [
        {
            url: { type: String, required: true },
            publicId: { type: String, required: true },
        }
        ],
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
        accommodationTitle: {
            type: String,
        },
        videoLink: {
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
        propertyType: {
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
        },
    },
    {timestamps: true}
);

export default mongoose.models.Listings || mongoose.model("Listings", listingsSchema);
