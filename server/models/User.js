import mongoose from "mongoose";
import { ProductShema } from "./Products.js";

const UserShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cars: [ProductShema],
}, {
    timestamps: true,
});

export default mongoose.model("user", UserShema);