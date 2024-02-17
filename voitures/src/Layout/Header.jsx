import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown, Row } from "react-bootstrap";
import { faArrowAltCircleUp, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useHeaderContentQuery } from "../Configuration/api";
import { logout } from "../Configuration/main";
import { useDispatch } from "react-redux";


function Header() {
    const { data } = useHeaderContentQuery();
    const adminKey = localStorage.getItem("adminKey") || null;
    const [isVisible, setIsVisible] = useState(Boolean);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const logoutFun = () => {
        dispatch(logout());
        navigate("/", { relative: "path" });
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
                            <Dropdown.Toggle variant="dark" className="dropdown-btn" id="dropdown-basic">{adminKey ? "Admin" : "Utilisateur"}</Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                                {
                                    adminKey ? (
                                        <>
                                            <Link className="link-for-btn" to="/admin/dislike-cars"><Dropdown.Item href="/admin/dislike-cars">Voitures Signalés</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/reservations"><Dropdown.Item href="/admin/reservations">Reservations</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/create-listing"><Dropdown.Item href="/admin/create-listing">Crée une Listing</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/agence-detail"><Dropdown.Item href="/admin/agence-detail">Agence Detail</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/listing"><Dropdown.Item href="/admin/listing">Mes Voitures</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/abonnes"><Dropdown.Item href="/admin/abonnes">Les Abonnés</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/admin/messages"><Dropdown.Item href="/admin/messages">Messages</Dropdown.Item></Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link className="link-for-btn" to="/compte"><Dropdown.Item href="/account">Compte</Dropdown.Item></Link>
                                            <Link className="link-for-btn" to="/reservations"><Dropdown.Item href="/reservations">Mes Resérvations</Dropdown.Item></Link>
                                            <Link className="link-for-btn" onClick={logoutFun}><Dropdown.Item>Déconnecter</Dropdown.Item></Link>
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
                        <NavLink to="/" style={{ textDecoration: "none" }}><Navbar.Brand href="" className="text-light fs-3">MyAuto</Navbar.Brand></NavLink>
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