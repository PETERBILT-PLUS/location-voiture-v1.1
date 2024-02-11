import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useAcceptReservationMutation, useReservationsMutation } from '../Configuration/api.js';
import { differenceInDays } from 'date-fns';
import "../styles/adminReservation.css";


function Reservations() {
    const [reservations] = useReservationsMutation();
    const [usersReservations, setUsersReservations] = useState([]);
    const adminKey = localStorage.getItem("adminKey") || null;
    const [startPage, setStartPage] = useState(false);
    const [state, setState] = useState(false);
    const [accept] = useAcceptReservationMutation();
    useEffect(() => {
        const getReservations = async () => {
            try {
                const res = await reservations({ adminKey });
                console.log(res);
                if (res?.data?.success) {
                    setUsersReservations(res?.data?.cars);
                    setStartPage(true);
                } else {
                    toast.error("Error Fetching The Data...");
                    setStartPage(true);
                }
            } catch (error) {
                console.log(error);
                setStartPage(true);
            }
        }
        getReservations();
    }, [state]);
    const acceptReservation = async (carId, userId) => {
        try {
            const res = await accept({ adminKey, carId, userId });
            console.log(res);
            if (res?.data?.success) {
                toast.success("reservation Accepté");
                setState((prev) => !prev);
            } else {
                toast.error("Error...");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <section className="py-5 bg-light" style={{ minHeight: "96vh" }}>
            <ToastContainer />
            <Container>
                <h2 className="title display-5 text-center py-5">Reservations</h2>
                <div className="py-3">
                    {usersReservations.length ?
                        (
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Utilisateur</th>
                                        <th>Voiture</th>
                                        <th>Temps</th>
                                        <th>Prix</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersReservations.map((elem) => {
                                        const { username, carName, timeStart, timeEnd, pricePerDay, accepted, carId, userId } = elem;
                                        return (
                                            <tr>
                                                <td>{username}</td>
                                                <td>{carName}</td>
                                                <td>{`${timeStart.slice(0, 10)} - ${timeEnd.slice(0, 10)}`}</td>
                                                <td>{pricePerDay} DH/jour <br /> Total: {pricePerDay * differenceInDays(new Date(timeEnd.slice(0, 10)), new Date(timeStart.slice(0, 10)))} DH</td>
                                                <td>{!accepted ? (
                                                    <button onClick={() => acceptReservation(carId, userId)} title="Click to Accept" className="waiting" type="button">
                                                        En Attend
                                                    </button>
                                                ) : (
                                                    <button disabled className="accepted" title="Accepted" type="button">
                                                        Accepté
                                                    </button>
                                                )
                                                }</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        ) :
                        (
                            startPage && (
                                <div className="">
                                    <h3>Aucun Réservation...</h3>
                                </div>
                            )
                        )
                    }
                </div>
            </Container>
        </section>
    )
}

export default Reservations;