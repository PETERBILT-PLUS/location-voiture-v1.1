import React, { useRef, useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from "react-toastify";
import DatePicker from 'react-datepicker';
import "../styles/Voitures.css";
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInDays } from 'date-fns';
import Peoples from "../Images/users-solid.svg";
import Fuel from "../Images/gas-pump-solid.svg";
import Km from "../Images/gauge-high-solid.svg";
import Car from "../Images/car-solid.svg";
import { useSelector } from "react-redux";
import { useAddCarMutation, useSignalerMutation } from "../Configuration/api.js";


function VoitureProperty({ first, second, thirt, fourth, id }) {
    const user_id = useSelector((state) => state.user.user.currentUser._id) || null;
    const [addCarApi] = useAddCarMutation();
    const [signale] = useSignalerMutation();
    const [showModal, setShowModal] = useState(false);
    const [pickUpDate, setPickUpDate] = useState(null);
    const [endWorkDate, setEndWorkDate] = useState(null);
    const myRef = useRef(null);


    const signaler = async (id) => {
        if (myRef.current.value.trim()) {
            const res = await signale({ user_id, car_id: id, description: myRef.current.value });
            console.log(res);
            if (res.data.success && res.data.message === "voiture signalé") {
                toast.success("Voiture Signalé");
            } else if (!res.data.success && res.data.message === "voiture déja signalé") {
                toast.warning("Voiture Déja Signalé");
            }
        } else {
            toast.warning("Ecrire Un message Pour Justifier");
        }
    }

    const addCar = async (id) => {
        if (pickUpDate && endWorkDate && differenceInDays(endWorkDate, pickUpDate) !== 0) {
            const res = await addCarApi({ user_id, car_id: id, pickUpDate, endWorkDate, timeTotal: differenceInDays(endWorkDate, pickUpDate) });
            console.log(res);
            if (res?.data?.success && res?.data?.message == "voiture ajouté") {
                toast.success("Reservation Réussie");
                return false;
            }
            else if (res?.data?.success && res?.data?.message == "voiture déja reservé") {
                toast.warning("Voiture Déja Reservé");
                return false;
            } else {
                toast.error("Réservation non Réussie");
                return false;
            }
        } else {
            toast.warning("Entrer Les Informations Du Date");
            return false;
        }
    }


    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handlePickUpDateChange = (date) => {
        setPickUpDate(date);
    };

    const handleEndWorkDateChange = (date) => {
        setEndWorkDate(date);
    };

    const handleSubmit = () => {
        // You can handle the form submission logic here
        console.log('Pick Up Date:', pickUpDate);
        console.log('End Work Date:', endWorkDate);
        // Add additional logic as needed

        if (pickUpDate && endWorkDate) {
            // Calculate the difference in days
            const daysDifference = differenceInDays(endWorkDate, pickUpDate);

            // Now you can use the "daysDifference" variable for further processing
        } else {
            // Handle the case where either pick-up date or end work date is not selected
            console.error('Please select both pick-up and end work dates.');
        }

        handleCloseModal();
    };


    return (
        <div className="row">
            <ToastContainer />
            <div className="d-flex flex-row align-items-start col-12 col-md-6 row px-4 py-4">

                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Peoples} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{first || null} palces</p>
                </div>
                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Fuel} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{second || null}</p>
                </div>
                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Km} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{thirt || null} km</p>
                </div>
                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Car} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{fourth || null}</p>
                </div>




                <div className="border-top pt-4 d-flex flex-row justify-content-between align-items-center">
                    <button className="date-btn" onClick={handleShowModal}>Choisir La Date</button>
                    <div className="time-division">
                        <p>{pickUpDate && endWorkDate && <span>Pour {differenceInDays(endWorkDate, pickUpDate)} {differenceInDays(endWorkDate, pickUpDate) < 2 ? "Jour" : "Jours"}</span>}</p>
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Choisir Le Temps</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="pickUpDate" className="py-1">
                                    <Form.Label className="px-1">Date de départ</Form.Label>
                                    <DatePicker
                                        selected={pickUpDate}
                                        onChange={handlePickUpDateChange}
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control"
                                    />
                                </Form.Group>

                                <Form.Group controlId="endWorkDate" className="py-1">
                                    <Form.Label className="px-1">Date D'arriver</Form.Label>
                                    <DatePicker
                                        selected={endWorkDate}
                                        onChange={handleEndWorkDateChange}
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control"
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Fermer
                            </Button>
                            <Button variant="primary" onClick={handleSubmit} className="enregistrer-btn">
                                Enregistrer
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>



            </div>
            <div className="col-12 col-md-6 px-4 py-4 text-align-center">
                <div className="btns col-12 py-4 text-align-center d-flex flex-row justify-content-center">
                    <button className="accept margin-auto" onClick={() => addCar(id)}>Demander</button>
                    <button className="reject margin-auto" onClick={() => signaler(id)}>Signaler</button>
                </div>
                <div className="comment py-4 text-align-center">
                    <textarea className="col-12" placeholder="Message" ref={myRef}></textarea>
                </div>
            </div>
        </div>
    );
}

export default VoitureProperty;