import bcrypt from "bcrypt";
import UserShema from "../models/User.js"
import jwt from "jsonwebtoken";
import AgenceDetail from "../models/AgenceDetail.js";
import Products from "../models/Products.js";


export const headerContent = async (req, res) => {
    try {
        const content = await AgenceDetail.find();
        const { description, email, tel } = content[0];
        console.log(description, email, tel);
        res.status(201).json({ success: true, description, email, tel });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error });
    }
}

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res.status(200).json({ success: false, message: "Missing informations" });
        console.log(username, email, password);
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserShema({
            username,
            email,
            password: hashPassword
        });
        const savedUser = newUser.save();
        res.status(201).json({ success: true, message: "user is created" });
    } catch (error) {
        res.status(502).json({ success: false, error: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password: userPass } = req.body;
    try {
        if (!email || !userPass) return res.status(200).json({ success: false, message: "Missing informations" });
        console.log(email, userPass);
        const userExist = await UserShema.findOne({ email: email });
        if (!userExist) {
            return res.status(400).json({ message: "user does not exist" });
        }
        const isMatch = await bcrypt.compare(userPass, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);
        const { password, ...rest } = userExist._doc;
        res.status(201).json({ success: true, userExist: rest, token, message: "User crée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const google = async (req, res) => {
    const { username, email } = req.body;
    try {
        if (!email || !email) return res.status(200).json({ success: false, message: "Missing informations" });
        const user = await UserShema.findOne({ email });
        const generatePassword = Math.random().toString(36).slice(-8);
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: userPassword, ...rest } = user._doc;
            res.status(201).json({ success: true, userExist: rest, token, password: generatePassword.toString(), message: "User crée" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(generatePassword, salt);
            const newUser = new UserShema({
                userName: username,
                email: email,
                password: hashPassword,
            });
            const savedUSer = newUser.save();
            res.status(201).json({ success: true, message: "user crée" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { username, email, password, userId } = req.body;
    try {
        if (!username || !email || !password || !userId) return res.status(200).json({ success: false, message: "Missing informations" });
        const userExisting = await UserShema.findOne({ email });
        if (userExisting) {
            const isMatch = password == userExisting.password;
            if (isMatch) {
                const updateUser = await UserShema.findByIdAndUpdate(userId, {
                    username: username,
                    password: password,
                }, { new: true });
                const { password: pass, ...rest } = updateUser._doc;
                res.status(201).json({ success: true, message: "Update", userExist: rest });
            } else {
                res.status(202).json({ success: false, message: "password est incrorrect", userExist: { username, email, password, userId } });
            }
        } else {
            res.status(404).json({ success: false, message: "pas de user prend cet Email", userExist: { username, email, password, userId } });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "une error dans l'updatation" });
    }
}

export const getCars = async (req, res) => {
    try {
        const cars = await Products.find();
        if (!cars) return res.status(404).json({ success: false, message: "Pas de voitures" });
        res.status(200).json({ success: true, data: cars });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

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

export const addCar = async (req, res) => {
    const { user_id, car_id } = req.body;
    console.log(user_id, car_id);
    try {
        if (!user_id || !car_id) return res.status(403).json({ success: false, message: "missing informations" });
        const user = await UserShema.findById(user_id);
        const car = await Products.findById(car_id);
        if (!user || !car) return res.status(404).json({ success: false, message: "pas de voiture prend cet _id" });
        console.log(user);
        console.log(car);
        user.products.push(car);
        res.status(201).json({ success: true, message: "voiture ajouté" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}