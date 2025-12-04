import mongoose from "mongoose";
const { Schema } = mongoose;

const FavoriteSchema = new Schema(
    {
        email:{
            type: String,
            required: true,
        },
        listingId:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema);
