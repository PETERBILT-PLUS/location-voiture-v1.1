import express from "express";
import mongoose from "mongoose"
import cors from "cors"
import { router } from "./Router/auth.js";
import dotenv from "dotenv";
import { adminRouter } from "./Router/admin.js";


const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", router);
app.use("/", adminRouter)
mongoose.connect(`mongodb://admin:${process.env.DB_PASSWORD}@ac-5ld4spd-shard-00-00.9hzjtcz.mongodb.net:27017,ac-5ld4spd-shard-00-01.9hzjtcz.mongodb.net:27017,ac-5ld4spd-shard-00-02.9hzjtcz.mongodb.net:27017/?replicaSet=atlas-mbqr45-shard-0&ssl=true&authSource=admin`)
    .then(() => console.log("database connected"))
app.listen(3001, () => {
    console.log("server is running on port 3001");
})