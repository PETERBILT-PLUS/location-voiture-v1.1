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
    // Scroll to top when the component mounts or pathname changes
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section py-5" id="hero-section">
                <Container>
                    <Row>
                        <Col className="col-12 col-md-7 text-light pt-2 text-center text-md-start">
                            <h1 className="py-3 display-5">Decouvrer Le <span className="maroc-span">Maroc</span></h1>
                            <p className="lead fs-6 pb-3">
                                Découvrez les merveilles du Maroc avec notre service de location de voitures. Parcourez les routes pittoresques et explorez les joyaux cachés de ce magnifique pays. Que vous soyez à la recherche d'une aventure en montagne, d'une escapade balnéaire ou d'une immersion dans la culture riche de ses villes historiques, nous avons la voiture parfaite pour rendre votre voyage inoubliable. Réservez dès maintenant et embarquez pour une expérience exceptionnelle!
                            </p>
                            <Link to="/voitures"><button className="hero-btn">Reserver</button></Link>
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
                                <p className="lead presentation-para">Choisissez notre agence de location de voitures pour des voyages sans soucis. Avec notre flotte de véhicules modernes et bien entretenus, nous vous offrons confort, sécurité et liberté pour explorer le Maroc à votre rythme. Notre équipe dévouée est là pour vous fournir un service personnalisé et répondre à tous vos besoins en matière de location de voitures. Profitez de votre séjour en toute tranquillité d'esprit en optant pour la qualité et la fiabilité avec nous.</p>
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
                        <h6 className="title text-center text-dark fs-5 py-2">Découvrez notre agence de location de voitures et préparez-vous à vivre une expérience unique au Maroc. Que vous planifiez un road trip le long des côtes ensoleillées, une escapade dans le désert majestueux ou une exploration des villes historiques chargées d'histoire, notre équipe est là pour vous fournir les véhicules parfaitement adaptés à vos besoins. Réservez dès maintenant et partez à la découverte des trésors cachés de ce magnifique pays.</h6>
                        <Link className="m-auto my-2" to="/contacter"><button className="hero-btn text-center">Plus D'infos</button></Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;