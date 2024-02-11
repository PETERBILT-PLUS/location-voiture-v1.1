import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserShema from "../models/User.js"
import AgenceDetail from "../models/AgenceDetail.js";
import Products from "../models/Products.js";
import DislikeCars from "../models/DislikeCars.js";
import EmailSchema from "../models/Emails.js";
import Message from "../models/Messages.js";

// Get header content from AgenceDetail
export const headerContent = async (req, res) => {
    try {
        const content = await AgenceDetail.find();
        const { description, email, tel } = content[0];
        // Return header content
        res.status(200).json({ success: true, description, email, tel });
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: error.message });
    }
}

// Register a new user
export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res.status(400).json({ success: false, message: "Missing information" });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserShema({
            username: username,
            email: email,
            password: hashPassword
        });
        await newUser.save();
        // Return success message
        res.status(201).json({ success: true, message: "User created" });
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: error.message });
    }
}

// Login user
export const login = async (req, res) => {
    const { email, password: userPass } = req.body;
    try {
        if (!email || !userPass) return res.status(400).json({ success: false, message: "Missing information" });
        const userExist = await UserShema.findOne({ email: email });
        if (!userExist) {
            // Return error if user does not exist
            return res.status(404).json({ success: false, message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(userPass, userExist.password);
        if (!isMatch) {
            // Return error if password is incorrect
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
        const { password, ...rest } = userExist._doc;
        // Return user data and token
        res.status(200).json({ success: true, userExist: rest, token, message: "User logged in" });
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: error.message });
    }
}

// Handle Google login/signup
export const google = async (req, res) => {
    const { username, email } = req.body;
    try {
        if (!email || !email) return res.status(400).json({ success: false, message: "Missing information" });
        const user = await UserShema.findOne({ email });
        const generatePassword = Math.random().toString(36).slice(-8);
        if (user) {
            // Return user data if user already exists
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: userPassword, ...rest } = user._doc;
            res.status(200).json({ success: true, userExist: rest, token, password: generatePassword.toString(), message: "User logged in" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(generatePassword, salt);
            const newUser = new UserShema({
                username: username,
                email: email,
                password: hashPassword,
            });
            await newUser.save();
            // Return success message
            res.status(201).json({ success: true, message: "User created" });
        }
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: error.message });
    }
}

// Update user details
export const updateUser = async (req, res) => {
    const { username, email, password, userId } = req.body;
    try {
        if (!username || !email || !password || !userId) return res.status(400).json({ success: false, message: "Missing information" });
        const userExisting = await UserShema.findOne({ email });
        if (userExisting) {
            const isMatch = password == userExisting.password;
            if (isMatch) {
                const updateUser = await UserShema.findByIdAndUpdate(userId, {
                    username: username,
                    password: password,
                }, { new: true });
                const { password: pass, ...rest } = updateUser._doc;
                // Return updated user details
                res.status(200).json({ success: true, message: "User updated", userExist: rest });
            } else {
                // Return error if password is incorrect
                res.status(400).json({ success: false, message: "Incorrect password", userExist: { username, email, password, userId } });
            }
        } else {
            // Return error if user with email does not exist
            res.status(404).json({ success: false, message: "User not found with this email", userExist: { username, email, password, userId } });
        }
    } catch (error) {
        // Handle server error
        res.status(500).json({ success: false, message: "Error updating user" });
    }
}

// Get All The cars from The Server
export const getCars = async (req, res) => {
    try {
        const cars = await Products.find();
        if (!cars) return res.status(404).json({ success: false, message: "Pas de voitures" });
        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// get A Single Car
export const getCar = async (req, res) => {
    const { car_id } = req.body;
    console.log(car_id);
    try {
        if (!car_id) return res.status(403).json({ success: false, message: "missing car_id" });
        const car = await Products.findById(car_id);
        if (!car) return res.status(404).json({ success: false, message: "pas de resultat" });
        res.status(200).json({ success: true, car });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Add a car to Reservations
export const addCar = async (req, res) => {
    const { user_id, car_id, pickUpDate, endWorkDate, timeTotal } = req.body;
    try {
        if (!user_id || !car_id || !pickUpDate || !endWorkDate || !timeTotal) return res.status(403).json({ success: false, message: "missing informations" });
        const car = await Products.findById(car_id);
        const user = await UserShema.findById(user_id);
        if (!car) return res.status(404).json({ success: false, message: "pas de voiture prend cet _id" });
        if (!user) return res.status(404).json({ success: false, message: "utilisateur pas trouvée" });
        car.timeStart = pickUpDate;
        car.timeEnd = endWorkDate;
        car.totalDays = timeTotal;

        const findIfCarIsAdded = user.cars.find((elem) => elem._id == car_id);

        if (findIfCarIsAdded) {
            res.status(200).json({ success: false, message: "voiture déja reservé" });
            return false;
        } else {
            user.cars.push(car);
            user.save();
            res.status(201).json({ success: true, message: "voiture ajouté" });
            return false;
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// getThe user Reservations
export const getCarsReservation = async (req, res) => {
    try {
        const { user_id } = req.body;
        if (!user_id) return res.status(403).json({ success: false, message: "user Id required" });
        const user = await UserShema.findById(user_id);
        if (!user) return res.status(404).json({ success: false, message: "Utilisateur Pas trouvée" });
        res.status(200).json({ success: true, message: "found", cars: user.cars.sort((a, b) => new Date(b.timeStart) - new Date(a.timeStart)) });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// cancel A Reservation and check if the reservation is already exits
export const cancelReservation = async (req, res) => {
    try {
        const { user_id, car_id } = req.body;
        const user = await UserShema.findById(user_id);
        if (!user) return res.status(404).json({ success: false, message: "pas d'utilisateur avec cet _id" });
        user.cars = user.cars.filter((car) => car._id != car_id);
        await user.save();
        res.status(201).json({ success: true, message: "Réservation annulé" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

// Signal A car With a message
export const signaler = async (req, res) => {
    try {
        const { user_id, car_id, description } = req.body;
        if (!user_id || !car_id || !description) return res.status(203).json({ success: false, message: "missing informations" });
        const existingSignal = await DislikeCars.findOne({ userId: user_id, carId: car_id });
        if (existingSignal) return res.status(203).json({ success: false, message: "voiture déja signalé" });
        const newDislike = new DislikeCars({
            userId: user_id,
            carId: car_id,
            message: description,
        });
        await newDislike.save()
        res.status(201).json({ success: true, message: "voiture signalé" });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//send Email
export const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(401).json({ success: false, message: "Missing Credantials" });
        const newEmail = new EmailSchema({
            email: email
        });
        if (!newEmail) return res.status(500).json({ success: false, message: "Internal Server Error" });
        await newEmail.save();
        res.status(201).json({ success: true, message: "Email Submited Succesfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

//send A message with the name and the email
export const sendMessageWithEmail = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) return res.status(401).json({ success: false, message: "Missing Credantials" });
        const newMessageWithEmail = new Message({
            name: name,
            email: email,
            message: message,
        });
        await newMessageWithEmail.save();
        console.log(newMessageWithEmail);
        res.status(201).json({ success: true, message: "Message Create Succesfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}