import express from "express";
import { acceptReservation, adminListing, adminReservations, agenceDetail, changeListing, createListings, deleteItem, dislikeTheCar, forAdminMessages, getAbonnes, getSingleListing } from "../controller/admin.js";

export const adminRouter = express.Router();

adminRouter.post("/create-listing", createListings);
adminRouter.post("/listing", adminListing);
adminRouter.post("/agence-detail", agenceDetail);
adminRouter.post("/get-single-listing", getSingleListing)
adminRouter.post("/change-listing", changeListing);
adminRouter.delete("/deleteItem", deleteItem);
adminRouter.post("/dislike-cars", dislikeTheCar);
adminRouter.post("/reservations", adminReservations);
adminRouter.post("/accept-reservation", acceptReservation);
adminRouter.post("/get-abonnes", getAbonnes);
adminRouter.post("/for-admin-messages", forAdminMessages);