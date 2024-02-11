import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useCancelReservationMutation, useGetCarReservationMutation } from "../Configuration/api";
import "../styles/voitureReservation.css";


function VoitureReservations() {
    const [reservations] = useGetCarReservationMutation();
    const [cancelReserve] = useCancelReservationMutation();
    const [cars, setCars] = useState([]);
    const { _id: user_id } = useSelector((state) => state.user.user.currentUser) || null;
    const [startPage, setStartPage] = useState(false);

    useEffect(() => {
        const getReservation = async () => {
            const res = await reservations({ user_id });
            console.log(res);
            if (res?.data?.success) {
                setCars(res.data.cars);
                setStartPage(true);
            } else {
                toast.error("Une error pour le requet");
                setStartPage(true);
            }
        }
        getReservation();
    }, []);

    const cancelReservation = async (user_id, car_id) => {
        try {
            const res = await cancelReserve({ user_id, car_id });
            console.log(res);
            if (res?.data?.success) {
                toast.success("Reservation Annulé");
                await new Promise((resolve) => setTimeout(resolve, 2200));
                window.location.reload();
            } else {
                toast.error("Une Erreur, Réservation pas Annulé");
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <section className="py-5 bg-light reservation-section" style={{ minHeight: "96vh" }}>
            <ToastContainer />
            <Container>
                <h2 className="py-5 text-center reservation-title">Mes Reservaion</h2>
                <div className="py-4 px-3">
                    {cars.length ? (
                        cars.map((elem) => {
                            const { name, photos, pricePerDay, accepted, _id, timeStart, timeEnd, totalDays } = elem;
                            return (
                                <Card className="my-4">
                                    <Row noGutters>
                                        <Col xs={12} md={5}>
                                            <Card.Img variant="top" src={photos[0]} alt={name} style={{ height: "100%", borderTopRightRadius: "0", borderEndStartRadius: "5px" }} />
                                        </Col>
                                        <Col xs={12} md={7} className="py-3 d-flex flex-row justify-content-betwen align-items-center">
                                            <div className="w-75 row px-3" style={{ height: "100%" }}>

                                                <div className="w-100 col-4 d-flex flex-column justify-content-between align-items-start py-3">
                                                    <h4 className="display-6">{name}</h4>
                                                    <div className="d-flex flex-column justify-content-evenly align-items-start">
                                                        <h6 className="title py-2 border-bottom">pour {totalDays} {totalDays < 2 ? "Jour" : "Jours"} (De {timeStart.slice(0, 10)} à {timeEnd.slice(0, 10)})</h6>
                                                        <h6 className="title py-2 border-bottom">Prix pour un jour: {pricePerDay} DH</h6>
                                                        <h6 className="title py-2 border-bottom">prix total: {pricePerDay * parseInt(totalDays)} DH</h6>
                                                    </div>
                                                    <strong className="my-2">Status:{"  "}
                                                        {accepted ? (
                                                            <span className="badge">Accepté (Allé pour payer par agence)</span>
                                                        ) : (
                                                            <span className="badge">En attend</span>
                                                        )}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="w-25 d-flex flex-column justify-content-start align-items-center pt-4" style={{ height: "100%" }}>
                                                <button className="cancel-btn" onClick={() => cancelReservation(user_id, _id)}>Annulé</button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            );
                        })
                    )
                        : startPage && (
                            <h3 className="text-center">Pas de Reservations.</h3>
                        )}
                </div>
            </Container>
        </section>
    );
}

export default VoitureReservations;