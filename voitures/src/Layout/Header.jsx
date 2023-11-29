import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown, Row } from "react-bootstrap";
import { faArrowAltCircleUp, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink } from "react-router-dom";
import { useHeaderContentQuery } from "../Configuration/api";


function Header() {
    const adminKey = localStorage.getItem("adminKey") || "";
    const [isVisible, setIsVisible] = useState(Boolean);
    const [info, setInfo] = useState({});
    const { data } = useHeaderContentQuery();
    console.log(data?.email);

    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        })
    }, []);
    const scrollTopFn = () => {
        window.scrollTo(0, 0);
    }
    return (
        <header className="header bg-light">
            <button style={{ visibility: isVisible ? "visible" : "hidden" }} onClick={scrollTopFn} ><FontAwesomeIcon icon={faArrowAltCircleUp} className="btn-scrollTop" /></button>
            <div className="first-container">
                <Container className="py-1 bg-light text-dark">
                    <Row className="d-flex flex-row justify-content-center align-items-center">

                        <div className="header-info col-4 d-none d-md-block">
                            <h4 className="px-1 mb-3"><FontAwesomeIcon icon={faEnvelope} style={{ color: "var(--blue)" }} /></h4>
                            <p>{data?.email}</p>
                        </div>

                        <div className="header-info col-4 d-none d-md-block">
                            <h4 className="px-1 mb-3"><FontAwesomeIcon icon={faPhone} style={{ color: "var(--blue)" }} /></h4>
                            <p>{data?.tel}</p>
                        </div>
                        <Dropdown className="col-12 col-md-4 text-end">
                            <Dropdown.Toggle variant="dark" className="dropdown-btn" id="dropdown-basic">Utilisateur</Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                                {
                                    adminKey ? (
                                        <>
                                            <Link className="link-for-btn" to="/admin/"><Dropdown.Item href="#">Reservations</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/create-listing"><Dropdown.Item href="/admin/create-listing">Crée une Listing</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/agence-detail"><Dropdown.Item href="/admin/agence-detail">Agence Detail</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/listing"><Dropdown.Item href="/admin/listing">Mes Voitures</Dropdown.Item></Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to=""><Dropdown.Item href="#">Compte</Dropdown.Item></Link>
                                            <Link to=""><Dropdown.Item href="#">Reservations</Dropdown.Item></Link>
                                            <Link to=""><Dropdown.Item href="#">Crée un Compte</Dropdown.Item></Link>
                                            <Link to=""><Dropdown.Item href="#">Deconnecter</Dropdown.Item></Link>
                                        </>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Row>
                </Container>
            </div>

            <div className="second-container">
                <Container>
                    <Navbar expand="lg" variant="dark">
                        <Navbar.Brand href="#" className="text-light fs-3">MyAuto</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                                <NavLink to="/" className={({ isActive }) => isActive ? "link-item-active" : "link-item"}>ACCEUIL</NavLink>
                                <NavLink to="voitures" className={({ isActive }) => isActive ? "link-item-active" : "link-item"}>NOS VOITURES</NavLink>
                                <NavLink to="contacter" className={({ isActive }) => isActive ? "link-item-active" : "link-item"}>CONTACTER</NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
        </header>
    );
}

export default Header;