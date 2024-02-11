import mongoose from "mongoose";

export const DislikeCars = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});

export default mongoose.model("DislikeCar", DislikeCars);