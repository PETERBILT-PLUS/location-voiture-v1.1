import mongoose from "mongoose";

export const ProductShema = new mongoose.Schema({
    photos: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    marque: {
        type: String,
        required: true,
    },
    places: {
        type: Number,
        required: true,
    },
    fuel: {
        type: String,
        required: true,
    },
    km: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    pricePerDay: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("product", ProductShema);