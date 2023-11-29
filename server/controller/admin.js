import Products from "../models/Products.js";
import AgenceDetail from "../models/AgenceDetail.js";

export const createListings = async (req, res) => {
    const { imagesURL, carName, carMarque, carFuel, doors, km, carType, pricePerDay, adminKey } = req.body;
    console.log(req.body);
    try {
        if (!imagesURL || !carName || !carMarque || !carFuel || !doors || !km || !carType || !pricePerDay || !adminKey) return res.status(200).json({ success: false, message: "Missing informations" });
        const KEY = process.env.KEY;
        if (adminKey == KEY) {
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
            const savedProduct = product.save();
            res.status(201).json({ success: true, message: "produit crée" });
        } else {
            res.status(300).json({ success: false, message: "not autorized" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const adminListing = async (req, res) => {
    const { adminKey } = req.body;
    const KEY = process.env.KEY;
    try {
        if (!adminKey) return res.status(200).json({ success: false, message: "Missing informations" });
        if (adminKey == KEY) {
            const cars = await Products.find();
            res.status(200).json({ success: true, cars: cars, message: "voitures found" });
        } else {
            res.status(304).json({ success: false, message: "Pas autorisée" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteItem = async (req, res) => {
    const { deleteItem, adminKey } = req.body;
    const KEY = process.env.KEY;
    try {
        if (KEY !== adminKey) return res.status(200).json({ success: false, message: "Pas Autorisée" });
        if (!deleteItem || !adminKey) return res.status(200).json({ success: false, message: "Missing informations" });
        const deleteCar = await Products.findByIdAndDelete(deleteItem);
        if (!deleteCar) return res.status(201).json({ success: false, message: "Une Error dans le serveur" });
        res.status(201).json({ success: true, message: "Voiture Supprimer" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const agenceDetail = async (req, res) => {
    const { email, tel, description, adminKey } = req.body;
    const KEY = process.env.KEY;
    try {
        if (KEY !== adminKey) return res.status(201).json({ success: false, message: "Pas autorisée" });
        if (!email && !tel && !description) {
            const agenceDetail = await AgenceDetail.findOne({});
            return res.status(201).json({ success: true, agenceDetail });
        }
        const agenceDetail = await AgenceDetail.findOneAndUpdate(
            {},
            { email, tel, description },
            { new: true, upsert: true }
        );
        if (agenceDetail) return res.status(201).json({ success: true, agenceDetail });
        else {
            res.status(500).json({ success: false, message: "Pas autorisée" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getSingleListing = async (req, res) => {
    const { _id, adminKey } = req.body;
    const KEY = process.env.KEY;
    console.log(req.body);
    try {
        if (KEY == adminKey) {
            const car = await Products.findById(_id);
            if (!car) return res.status(404).json({ success: false, message: "Pas de voiture avec cet _id" });
            console.log(car);
            res.status(200).json({ success: true, car: car });
        } else {
            res.status(403).json({ success: false, message: "Pas autorisé" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const changeListing = async (req, res) => {
    const { imagesURL, carName, carMarque, carFuel, doors, km, carType, pricePerDay, adminKey, _id } = req.body;
    const KEY = process.env.KEY;
    try {
        if (KEY == adminKey) {
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
            if (!updateCar) return res.status(306).json({ success: false, message: "Une Error Dans le serveur" });
            res.status(201).json({ success: true, message: "voiture ameliorer" });
        } else {
            res.status(403).json({ success: false, message: "Pas autorisée" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}