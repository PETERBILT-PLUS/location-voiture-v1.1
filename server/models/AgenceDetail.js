import mongoose from "mongoose";

const Agence = mongoose.Schema({
    tel: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export default mongoose.model("AgenceDetail", Agence);