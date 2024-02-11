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
    accepted: {
        type: Boolean,
        required: true,
        default: false,
    },
    timeStart: {
        type: String,
        required: false,
    },
    timeEnd: {
        type: String,
        required: false,
    },
    totalDays: {
        type: Number,
        required: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model("product", ProductShema);