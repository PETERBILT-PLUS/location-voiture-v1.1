import React, { useLayoutEffect } from "react";
import { Container, Row, Col, Card, CardImg } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/Home.css";
import Online from "../Images/online.svg";
import Dacia from "../Images/dacia-logan.jpg";
import Renault from "../Images/renault.jpg";
import Ford from "../Images/ford.jpg";
import Van from "../Images/van.jpg";


function Home() {
    const { pathname } = useLocation();
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <>
            <section className="hero-section py-5" id="hero-section">
                <Container>
                    <Row>
                        <Col className="col-12 col-md-7 text-light pt-2 text-center text-md-start">
                            <h1 className="py-3 display-5">Decouvrer Le <span className="maroc-span">Maroc</span></h1>
                            <p className="lead fs-6 pb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem distinctio inventore dolorum esse tempore dicta veritatis doloremque quia hic non!</p>
                            <button className="hero-btn">Reserver</button>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="py-5">
                <Container>
                    <div className="cars-benefits">
                        <Row className="py-5">
                            <div className="benefit col-12 col-md-6 py-3">
                                <img src={Online} alt="img" style={{ width: "100%", height: "250px" }} />
                            </div>
                            <div className="col-12 col-md-6">
                                <h2 className="title py-3 presentation-title">Pourquoi Chey Nous</h2>
                                <p className="lead presentation-para">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi explicabo rem fugiat aut sunt suscipit voluptates accusamus ipsum in aspernatur obcaecati, ex blanditiis magnam aliquid harum accusantium animi consectetur eum numquam ullam!</p>
                            </div>
                        </Row>
                    </div>
                </Container>
            </section>

            <section className="cars-section bg-light">
                <Container>
                    <h2 className="title py-5">Differents Types des Voitures</h2>
                    <Row>
                        <div className="col-8 col-sm-8 col-md-5 col-lg-3 mx-auto my-3">
                            <Card border="0" className="w-100 mx-auto">
                                <Link to="">
                                    <div className="card-description">
                                        <div className="card-img">
                                            <img src={Dacia} />
                                        </div>
                                        <div className="card-text text-center text-light">
                                            <h4>Sedan</h4>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </div>
                        <div className="col-8 col-sm-8 col-md-5 col-lg-3 mx-auto my-3">
                            <Card border="0">
                                <Link to="">
                                    <div className="card-description">
                                        <div className="card-img">
                                            <img src={Renault} />
                                        </div>
                                        <div className="card-text text-center text-light">
                                            <h4>SUV</h4>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </div>
                        <div className="col-8 col-sm-8 col-md-5 col-lg-3 mx-auto my-3">
                            <Card border="0">
                                <Link to="">
                                    <div className="card-description">
                                        <div className="card-img">
                                            <img src={Van} />
                                        </div>
                                        <div className="card-text text-center text-light">
                                            <h4>Utilaire</h4>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </div>
                        <div className="col-8 col-sm-8 col-md-5 col-lg-3 mx-auto my-3">
                            <Card border="0">
                                <Link to="">
                                    <div className="card-description">
                                        <div className="card-img">
                                            <img src={Ford} />
                                        </div>
                                        <div className="card-text text-center text-light">
                                            <h4>Sportive</h4>
                                        </div>
                                    </div>
                                </Link>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </section>

            <section className="about bg-light">
                <div className="row w-100">
                    <div className="about-img col-12 col-md-6 d-none d-md-block"></div>
                    <div className="about-text col-12 col-md-6 mx-auto my-auto d-flex flex-column justify-content-center align-items-center py-5 my-auto mx-auto">
                        <h6 className="title text-center text-dark fs-2 py-2">Visiter Notre Agence</h6>
                        <h6 className="title text-center text-dark fs-5 py-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, consequuntur! Vitae delectus commodi harum explicabo.</h6>
                        <Link className="m-auto my-2"><button className="hero-btn text-center">Plus D'infos</button></Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;