import mongoose from "mongoose";
const { Schema } = mongoose;

const SchoolsSchema = new Schema(
    {
        type:{
            type: String,
            required: true,
        },
        school:{
            type: String,
            required: true,
        },
        campuses:{
            type: [String],
            required: true,
        },
    }
);

export default mongoose.models.Schools || mongoose.model("Schools", SchoolsSchema)