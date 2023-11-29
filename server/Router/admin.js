import express from "express";
import { adminListing, agenceDetail, changeListing, createListings, deleteItem, getSingleListing } from "../controller/admin.js";

export const adminRouter = express.Router();

adminRouter.post("/admin/create-listing", createListings);
adminRouter.post("/admin/listing", adminListing);
adminRouter.post("/admin/agence-detail", agenceDetail);
adminRouter.post("/admin/get-single-listing", getSingleListing)
adminRouter.post("/admin/change-listing", changeListing);
adminRouter.delete("/admin/deleteItem", deleteItem);