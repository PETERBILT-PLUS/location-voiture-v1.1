import { useLayoutEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../Configuration/firebase";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Listing.css";
import { useListingsMutation } from "../Configuration/api";

function CreateListing() {
    const [files, setFiles] = useState([]);
    const [uploadByte, setUploadByte] = useState(0);
    const [imageLoading, setImageLoading] = useState(false);
    const adminKey = localStorage.getItem("adminKey") || "";
    const [listing] = useListingsMutation();
    const [formData, setFormData] = useState({
        imagesURL: [],
        carName: "",
        carMarque: "",
        carFuel: "",
        doors: null,
        km: null,
        carType: "",
        pricePerDay: 0,
        adminKey: adminKey,
    });

    useLayoutEffect(() => {
        document.title = "Crée Une Listing";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await listing(formData);
            console.log(res.data);
            if (res.data?.success) {
                toast.success("Produit crée");
            } else {
                toast.error("Pas Autorisée");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imagesURL.length < 7) {
            const promises = [];
            setImageLoading(true);
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImages(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imagesURL: formData.imagesURL.concat(urls) });
            });
        } else {
            toast.warning("maximum 7 images");
        }

    }
    const storeImages = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadByte(progress);
            }, (error) => {
                reject(error);
                setUploadByte(0);
                setImageLoading(false);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                    setUploadByte(0);
                    setImageLoading(false);
                });
            }
            );

        });
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imagesURL: formData.imagesURL.filter((_, idx) => idx !== index),
        });
    }
    return (
        <section style={{ minHeight: "100vh", maxHeight: "auto" }} className="create-listing-section bg-light py-5">
            <Container>
                <ToastContainer />
                <h2 className="title text-center py-5">Crée une listing</h2>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <Form className="col-12 col-md-10" onSubmit={handleSubmit}>
                            <Form.Control className="my-2" type="text" onChange={handleChange} name="carName" placeholder="Nom de voiture" />
                            <Form.Control className="my-2" type="text" onChange={handleChange} name="carMarque" placeholder="Marque de voiture" />
                            <Form.Control className="my-2" type="text" onChange={handleChange} name="carFuel" placeholder="type du carburant" />
                            <Form.Control className="my-2" type="number" onChange={handleChange} name="doors" placeholder="places" />
                            <Form.Control className="my-2" type="number" onChange={handleChange} name="km" placeholder="kilométrage" />
                            <Form.Control className="my-2" type="text" onChange={handleChange} name="carType" placeholder="type du voiture" />
                            <Form.Control className="my-2" type="number" onChange={handleChange} name="pricePerDay" placeholder="prix/jour DH" />
                            <Form.Control className="my-2" type="submit" value="Entrer" />
                        </Form>
                    </div>

                    <div className="col-12 col-md-6 row py-2">
                        <div className="col-12 d-flex flex-column">
                            <Form.Control type="file" onChange={(e) => setFiles(e.target.files)} accept="image/*" multiple />
                            {imageLoading && <p className="text-dark fs-6 text-center pt-2">Loading...</p>}
                            {uploadByte ? <p className="text-dark fs-6 text-center pt-2">upload byte {Math.floor(uploadByte)}%</p> : null}
                            <Button type="button" className="my-3 justify-self-center" onClick={handleImageSubmit}>Upload</Button>
                        </div>
                        <div style={{ borderRadius: "5px", height: "auto" }} className="border col-12">
                            {formData.imagesURL.length ? formData.imagesURL.map((elem, idx) => (
                                <div className="w-100 row py-2">
                                    <div className="img-wrapper col-4 px-2">
                                        <img src={elem} className="w-100" style={{ borderRadius: "5px", marginLeft: "10px" }} />
                                    </div>
                                    <div className="btn-wrapper d-flex flex-row justify-content-center align-items-center col-8">
                                        <Button className="btn-danger" onClick={() => handleRemoveImage(idx)}>Supprimer</Button>
                                    </div>
                                </div>
                            )
                            ) : null}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

export default CreateListing;