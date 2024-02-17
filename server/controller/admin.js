import Products from "../models/Products.js";
import AgenceDetail from "../models/AgenceDetail.js";
import DislikeCars from "../models/DislikeCars.js";
import UserModel from "../models/User.js";
import User from "../models/User.js";
import Abonnes from "../models/Emails.js";
import Message from "../models/Messages.js"
import nodemailer from "nodemailer";


// Function to create listings
export const createListings = async (req, res) => {
    // Extracting data from request body
    const { imagesURL, carName, carMarque, carFuel, doors, km, carType, pricePerDay, adminKey } = req.body;
    console.log(req.body);
    try {
        // Checking if all required fields are present
        if (!imagesURL || !carName || !carMarque || !carFuel || !doors || !km || !carType || !pricePerDay || !adminKey) 
            return res.status(400).json({ success: false, message: "Missing information" });
        
        // Checking admin key
        const KEY = process.env.KEY;
        if (adminKey !== KEY) 
            return res.status(403).json({ success: false, message: "Not authorized" });
        
        // Creating new product
        const product = new Products({
            photos: imagesURL,
            name: carName,
            marque: carMarque,
            fuel: carFuel,
            places: doors,
            km: km,
            type: carType,
            pricePerDay: pricePerDay
        });
        
        // Saving product to database
        const savedProduct = await product.save();
        res.status(201).json({ success: true, message: "Product created" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Function to fetch all listings
export const adminListing = async (req, res) => {
    const { adminKey } = req.body;
    const KEY = process.env.KEY;
    try {
        if (!adminKey) 
            return res.status(400).json({ success: false, message: "Missing information" });
        if (adminKey !== KEY) 
            return res.status(403).json({ success: false, message: "Not authorized" });
        
        // Fetching all cars
        const cars = await Products.find();
        res.status(200).json({ success: true, cars: cars, message: "Cars found" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Function to delete a listing
export const deleteItem = async (req, res) => {
    const { deleteItem, adminKey } = req.body;
    const KEY = process.env.KEY;
    try {
        if (!deleteItem || !adminKey) 
            return res.status(400).json({ success: false, message: "Missing information" });
        if (KEY !== adminKey) 
            return res.status(403).json({ success: false, message: "Not authorized" });

        // Deleting car
        const deleteCar = await Products.findByIdAndDelete(deleteItem);
        if (!deleteCar) 
            return res.status(404).json({ success: false, message: "Car not found" });
        res.status(200).json({ success: true, message: "Car deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Function to handle agency details
export const agenceDetail = async (req, res) => {
    const { email, tel, description, adminKey } = req.body;
    const KEY = process.env.KEY;
    try {
        if (!email && !tel && !description) {
            // Fetching agency details
            const agenceDetail = await AgenceDetail.findOne({});
            return res.status(200).json({ success: true, agenceDetail });
        }

        // Updating or creating agency details
        const agenceDetail = await AgenceDetail.findOneAndUpdate(
            {},
            { email, tel, description },
            { new: true, upsert: true }
        );

        // Checking admin key
        if (KEY !== adminKey) return res.status(403).json({ success: false, message: "Not authorized" });

        // Sending response
        if (agenceDetail) 
            return res.status(200).json({ success: true, agenceDetail });
        else 
            res.status(500).json({ success: false, message: "Not authorized" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Function to fetch a single listing
export const getSingleListing = async (req, res) => {
    const { _id, adminKey } = req.body;
    const KEY = process.env.KEY;
    try {
        if (KEY !== adminKey) 
            return res.status(403).json({ success: false, message: "Not authorized" });
        
        // Fetching car by ID
        const car = await Products.findById(_id);
        if (!car) 
            return res.status(404).json({ success: false, message: "Car not found" });
        res.status(200).json({ success: true, car: car });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Function to update a listing
export const changeListing = async (req, res) => {
    const { imagesURL, carName, carMarque, carFuel, doors, km, carType, pricePerDay, adminKey, _id } = req.body;
    const KEY = process.env.KEY;
    try {
        if (KEY !== adminKey) 
            return res.status(403).json({ success: false, message: "Not authorized" });

        // Updating car details
        const updateCar = await Products.findByIdAndUpdate(_id, {
            photos: imagesURL,
            name: carName,
            marque: carMarque,
            places: doors,
            fuel: carFuel,
            km: km,
            type: carType,
            pricePerDay: pricePerDay,
        });
        if (!updateCar) 
            return res.status(404).json({ success: false, message: "Car not found" });
        res.status(200).json({ success: true, message: "Car updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// Function to fetch disliked cars
export const dislikeTheCar = async (req, res) => {
    try {
        const { adminKey } = req.body;
        const KEY = process.env.KEY;
        // Checking admin key
        if (KEY === adminKey) {
            // Fetching disliked cars
            const dislikeCars = await DislikeCars.find().populate("userId").populate("carId");
            res.status(200).json({ success: true, cars: dislikeCars.sort((a, b) => new Date(b.timeStart) - new Date(a.timeStart)) /* Sort by reservation date in descending order */ });
        } else {
            res.status(403).json({ success: false, message: "Not authorized" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Function to fetch admin reservations
export const adminReservations = async (req, res) => {
    try {
        const { adminKey } = req.body;
        const KEY = process.env.KEY;
        // Checking admin key
        if (KEY !== adminKey) 
            return res.status(401).json({ success: false, message: "Not authorized" });
        // Fetching users
        const users = await UserModel.find();
        // Checking if users exist
        if (!users || users.length === 0) 
            return res.status(404).json({ success: true, message: "No cars in the database" });
        // Mapping users and their cars
        const carsWithUserDetail = users.flatMap((user) => {
            return (user.cars.map((car) => ({
                username: user.username,
                carName: car.name,
                timeStart: car.timeStart,
                timeEnd: car.timeEnd,
                totalDays: car.totalDays,
                pricePerDay: car.pricePerDay,
                accepted: car.accepted,
                userId: user._id,
                carId: car._id,
            })));
        }).sort((a, b) => new Date(b.timeStart) - new Date(a.timeStart)); // Sort by reservation date in descending order
        res.status(200).json({ success: true, message: "Reservations found", cars: carsWithUserDetail });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Function to accept a reservation
export const acceptReservation = async (req, res) => {
    try {
        const { adminKey, carId, userId } = req.body;
        // Checking if all credentials are provided
        if (!adminKey || !carId || !userId) 
            return res.status(401).json({ success: false, message: "Missing credentials" });
        const KEY = process.env.KEY;
        // Checking admin key
        if (KEY !== adminKey) 
            return res.status(401).json({ success: false, message: "Not authorized" });
        // Finding user
        const user = await User.findById(userId);
        if (!user) 
            return res.status(404).json({ success: false, message: "User not found" });
        // Finding car in user's cars
        const targetedCar = user.cars.find((car) => car._id == carId);
        if (!targetedCar) 
            return res.status(404).json({ success: false, message: "Car not found" });
        // Updating car's acceptance status
        targetedCar.accepted = true;
        await user.save();
        // Sending confirmation email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.email,
                pass: process.env.emailPass,
            },
        });
        const mailOption = {
            from: process.env.email,
            to: user.email,
            subject: "Reservation Accepted",
            text: `Dear ${user.username},\n\nYour reservation for ${targetedCar.name} has been accepted. Please proceed with payment.`,
        };
        await transporter.sendMail(mailOption);
        // Sending response
        res.status(200).json({ success: true, message: "Reservation accepted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Function to fetch subscribers
export const getAbonnes = async (req, res) => {
    try {
        const { adminKey } = req.body;
        const KEY = process.env.KEY;
        // Checking admin key
        if (KEY !== adminKey) 
            return res.status(401).json({ success: false, message: "Not authorized" });
        // Fetching subscribers
        const abonnes = await Abonnes.find();
        // Checking if subscribers exist
        if (!abonnes) 
            return res.status(200).json({ success: true, message: "No subscribers" });
        // Sending response
        res.status(200).json({ success: true, message: "Subscribers found", abonnes });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Function to fetch admin messages
export const forAdminMessages = async (req, res) => {
    try {
        const { adminKey } = req.body;
        const KEY = process.env.KEY;
        // Checking admin key
        if (KEY !== adminKey) 
            return res.status(401).json({ success: false, message: "Not authorized" });
        // Fetching messages
        const messages = await Message.find();
        // Checking if messages exist
        if (!messages) return res.status(200).json({ success: true, message: "No messages" });
        // Sending response
        res.status(200).json({ success: true, message: "Messages found", messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}