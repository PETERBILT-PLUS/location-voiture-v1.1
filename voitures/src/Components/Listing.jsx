import React, { useEffect, useState } from "react";
import { Button, Card, Container, Modal } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useDeleteItemMutation, useGetListingsMutation } from "../Configuration/api";
import "../styles/Listing.css";

function Listing() {
    const adminKey = localStorage.getItem("adminKey") || "";
    const [getListings] = useGetListingsMutation();
    const [show, setShow] = useState(false);
    const [cars, setCars] = useState([]);
    const [deleteItem, setDeleteItem] = useState("");
    const [deleteMutation] = useDeleteItemMutation();


    const handleDelete = async () => {
        // Your delete logic goes here
        // Close the confirmation modal
        setShow(false);
        console.log(deleteItem);
        const res = await deleteMutation({ deleteItem, adminKey });
        console.log(res);
        if (res.data.success) {
            toast.success("Voiture Supprimer");
            await new Promise((resolve) => setTimeout(resolve, 3000));
            window.location.reload();
        } else {
            toast.error("Une Error, Voiture Pas supprimer");
        }
    };

    const handleCancel = () => {
        // Cancel the delete operation
        setShow(false);
    };

    const handleShow = (_id) => {
        setShow(true);
        setDeleteItem(_id);
    }

    const handleChange = (_id) => {
        window.location.replace(`/admin/change-listing/${_id}`);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await getListings({ adminKey });
            console.log(res.data.success);
            if (res.data.success) {
                setCars(res.data.cars);
            } else {
                alert("une error dans l'API");
            }
        }
        fetchProducts();
    }, []);

    return (
        <section style={{ minHeight: "100vh", maxHeight: "auto" }} className="bg-light py-5">
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCancel()}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Container>
                <ToastContainer />
                <h2 className="title py-5 text-center">Listings</h2>
                <div className="listings-section d-flex flex-row justify-content-evenly align-items-center flex-wrap py-4">
                    {cars.length ? (cars.map((elem) => {
                        const { _id, name, fuel, photos, places, pricePerDay, type } = elem;
                        return (
                            <Card key={_id} style={{ width: '18rem' }} className="py-0 px-0 my-3">
                                <Card.Img variant="top" style={{ height: "175px" }} src={photos[0]} />
                                <Card.Body>
                                    <Card.Title className="pb-2 fs-4">{name}</Card.Title>
                                    <Card.Text>
                                        <h3 className="fs-6">type du carburant: {fuel}</h3>
                                        <h3 className="fs-6">places: {places}</h3>
                                        <h3 className="fs-6">type: {type}</h3>
                                        <h3 className="fs-6">{pricePerDay} DH/jour</h3>
                                    </Card.Text>
                                    <div className="py-2 d-flex gap-4 flew-row justify-content-start align-items-center">
                                        <Button className="supprimer" onClick={() => handleShow(_id)}>Supprimer</Button>
                                        <Button className="modifier" onClick={() => handleChange(_id)}>Modifier</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        );
                    })) : <h2 className="title text-center">Pas de Vehicules.</h2>}
                </div>
            </Container>
        </section>
    );
}

export default Listing;