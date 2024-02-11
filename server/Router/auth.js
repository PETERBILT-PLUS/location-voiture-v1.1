import express from "express";
import { register, login, google, updateUser, headerContent, addCar, getCars, getCar, getCarsReservation, cancelReservation, signaler, sendEmail, sendMessageWithEmail } from "../controller/auth.js";

export const router = express.Router();

router.get("/header-content", headerContent);
router.post("/get-car", getCar);
router.get("/get-cars", getCars)
router.post("/register", register);
router.post("/login", login);
router.post("/google", google);
router.post("/update-user", updateUser);
router.post("/add-car", addCar);
router.post("/car-reservation", getCarsReservation);
router.post("/cancel-reservation", cancelReservation);
router.post("/signaler-car", signaler);
router.post("/send-email", sendEmail);
router.post("/send-email-with-message", sendMessageWithEmail);