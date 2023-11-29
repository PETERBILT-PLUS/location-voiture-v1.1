import React from "react"
import Peoples from "../Images/users-solid.svg";
import Fuel from "../Images/gas-pump-solid.svg";
import Km from "../Images/gauge-high-solid.svg";
import Car from "../Images/car-solid.svg";
import { Card } from 'react-bootstrap'
import { Link } from "react-router-dom";


function CardItem({ id, url, title, seats, fuel, distance, type, price }) {
    return (
        <div className="col-12 col-lg-6 pb-4">
            <Link to={`/voitures/${id}`} style={{ textDecoration: "none" }}>
                <Card className="shadow rounded">
                    <Card.Img variant="top" alt={title} src={url} style={{ height: "280px", objectFit: "cover" }} />
                    <Card.Body className="px-0" style={{ textDecoration: "none" }}>
                        <Card.Title className="fs-3 pb-2 pt-1 px-3">{title}</Card.Title>
                        <Card.Text className="row m-auto px-3">
                            <div className="col-6 d-flex flex-row gap-2 py-2">
                                <img src={Peoples} alt="img" style={{ width: "30px" }} className="col-2 col-md-3" />
                                <p className="col-9 m-auto" style={{ fontSize: "12px" }}>{seats} palces</p>
                            </div>
                            <div className="col-6 d-flex flex-row gap-2 py-2">
                                <img src={Fuel} alt="img" style={{ width: "30px" }} className="col-2 col-md-3" />
                                <p className="col-9 m-auto" style={{ fontSize: "12px" }}>{fuel}</p>
                            </div>
                            <div className="col-6 d-flex flex-row gap-2 py-2">
                                <img src={Km} alt="img" style={{ width: "30px" }} className="col-2 col-md-3" />
                                <p className="col-9 m-auto" style={{ fontSize: "12px" }}>{distance} km</p>
                            </div>
                            <div className="col-6 d-flex flex-row gap-2 py-2">
                                <img src={Car} alt="img" style={{ width: "30px" }} className="col-2 col-md-3" />
                                <p className="col-9 m-auto" style={{ fontSize: "12px" }}>{type}</p>
                            </div>
                        </Card.Text>
                        <hr />
                            <div className="div-btn d-flex flex-row px-4">
                                <Link to={`/voitures/${id}`}><button className="card-btn m-auto">Plus d'infos</button></Link>
                                <h6 className="m-auto">{price} DH/jour</h6>
                            </div>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
}

export default CardItem;