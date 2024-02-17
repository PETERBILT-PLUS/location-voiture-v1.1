import React, { useState, useLayoutEffect, useEffect } from "react";
import { Container, Form as BootstrapForm, Row } from "react-bootstrap";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useGetCarsQuery } from "../Configuration/api";
import CardItem from "./CardItem";
import "../styles/Voitures.css";


function Voitures() {
    const { pathname } = useLocation();
    const [params, setParams] = useSearchParams();
    const myParams = useParams();
    const [cars, setCars] = useState([]);
    const { data, isLoading } = useGetCarsQuery();



    useEffect(() => {
        setCars(data?.data);
    }, [data?.data]);

    useLayoutEffect(() => {
        document.title = "Voitures";
        window.scrollTo(0, 0);
    }, [pathname]);


    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");

    const demo = (carFuel, carMarque, carType) => {
        const currentParams = Object.fromEntries(params);
        // V8
        if (carFuel) {
            // Check if car_fuel exists, and update or remove it.
            if (currentParams.hasOwnProperty('car_fuel')) {
                currentParams.car_fuel = carFuel;
                const newList = data?.data.filter((elem) => (
                    (!currentParams.car_fuel || elem.fuel == currentParams.car_fuel) &&
                    (!currentParams.car_marque || elem.marque == currentParams.car_marque) &&
                    (!currentParams.car_type || elem.type == currentParams.car_type)
                ));
                setCars(newList);
            } else {
                currentParams.car_fuel = carFuel; // Add the parameter if it doesn't exist.
            }
        }
        if (carMarque) {
            // Check if 'car_type' exists, and update or remove it.
            if (currentParams.hasOwnProperty('car_marque')) {
                currentParams.car_marque = carMarque; // Update the value.
                const newList = data?.data.filter((elem) => (
                    (!currentParams.car_fuel || elem.fuel === currentParams.car_fuel) &&
                    (!currentParams.car_marque || elem.marque === currentParams.car_marque) &&
                    (!currentParams.car_type || elem.type === currentParams.car_type)
                ));
                setCars(newList);
            } else {
                currentParams.car_marque = carMarque; // Add the parameter if it doesn't exist.
            }
            const newList = data?.data.filter((elem) => (
                (!currentParams.car_fuel || elem.fuel === currentParams.car_fuel) &&
                (!currentParams.car_marque || elem.marque === currentParams.car_marque) &&
                (!currentParams.car_type || elem.type === currentParams.car_type)
            ));
            setCars(newList);
        }
        if (carType) {
            if (currentParams.hasOwnProperty('car_type')) {
                currentParams.car_type = carType; // Update the value.
                const newList = data?.data.filter((elem) => (
                    (!currentParams.car_fuel || elem.fuel === currentParams.car_fuel) &&
                    (!currentParams.car_marque || elem.marque === currentParams.car_marque) &&
                    (!currentParams.car_type || elem.type === currentParams.car_type)
                ));
                setCars(newList);
            } else {
                currentParams.car_type = carType; // Add the parameter if it doesn't exist.
            }
        }
        const newList = data?.data.filter((elem) => (
            (!currentParams.car_fuel || elem.fuel === currentParams.car_fuel) &&
            (!currentParams.car_marque || elem.marque === currentParams.car_marque) &&
            (!currentParams.car_type || elem.type === currentParams.car_type)
        ));
        setCars(newList);
        setParams(currentParams)
    }

    const refeltring = async (car) => {
        const urlParams = new URLSearchParams(window.location.search);

        const fuel = urlParams.get("car_fuel");
        const marque = urlParams.get("car_marque");
        const type = urlParams.get("car_type");

        const newList = data?.data.filter((elem) => (
            (!fuel || elem.fuel === fuel) &&
            (!marque || elem.marque === marque) &&
            (!type || elem.type === type)
        ));
        setCars(newList);
        //this is a click on the same button that run all this functions because we need two clicks

        if (car === "car-fuel") {
            document.getElementById("car-fuel").click();
        }
        if (car === "car-marque") {
            document.getElementById("car-marque").click();
        }
        if (car === "car-type") {
            document.getElementById("car-type").click();
        }
    }

    const clearCarProperty = async (property, groupe) => {
        const currentParams = Object.fromEntries(params);
        const current = params.toString();
        const currentURL = new URLSearchParams(current);
        currentURL.delete(property);
        setParams(currentURL);
        switch (groupe) {
            case "one":
                setOption1("");
                refeltring("car-fuel");
                break;
            case "two":
                setOption2("");
                refeltring("car-marque");
                break;
            case "three":
                setOption3("");
                refeltring("car-type");
                break;
        }
    }


    return (
        <>
            <section className="cars-section py-5" id="hero-section">
                <Container>
                    <h2 className="title fs-1 text-start py-5">Choisir Votre voiture</h2>
                    <Row className="d-flex flex-row row-reverse">

                        <div className="col-12 col-md-4 border px-3 py-2" style={{ borderRadius: "5px", backgroundColor: "#fefefe" }}>
                            <div className="d-flex flex-column justify-content-start aligh-items-center">
                                <div className="fuel-type py-4 border-bottom">
                                    <h3 className="title fs-5">Type du Carburant</h3>
                                    <div className="text-start px-3 py-2">
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("essence", "")}>
                                            <BootstrapForm.Check checked={option1 === "option1"} onChange={() => setOption1("option1")} type="radio" name="group1" id="label1" />
                                            <BootstrapForm.Check className="px-2">Essence</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("diesel", "")}>
                                            <BootstrapForm.Check checked={option1 === "option2"} onChange={() => setOption1("option2")} type="radio" name="group1" id="label1" />
                                            <BootstrapForm.Check className="px-2">Diesel</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("hybride", "")}>
                                            <BootstrapForm.Check checked={option1 === "option3"} onChange={() => setOption1("option3")} type="radio" name="group1" id="label1" />
                                            <BootstrapForm.Check className="px-2">Hybride</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                    </div>
                                    <div className="px-3 py-2">
                                        <button class="clear-btn" type="button" id="car-fuel" onClick={() => clearCarProperty("car_fuel", "one")}>Clear</button>
                                    </div>
                                </div>
                                <div className="car-marque py-4 border-bottom">
                                    <h3 className="title fs-5">La Marque de Voiture</h3>
                                    <div className="d-flex flex-column text-start px-3 py-2">
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "dacia", "")}>
                                            <BootstrapForm.Check onChange={() => setOption2("option1")} type="radio" name="group2" checked={option2 === "option1"} id="label2" />
                                            <BootstrapForm.Check className="px-2">Dacia</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "citroen", "")}>
                                            <BootstrapForm.Check onChange={() => setOption2("option2")} type="radio" name="group2" checked={option2 === "option2"} id="label2" />
                                            <BootstrapForm.Check className="px-2">Citroen</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "fiat", "")}>
                                            <BootstrapForm.Check onChange={() => setOption2("option3")} type="radio" name="group2" checked={option2 === "option3"} id="label2" />
                                            <BootstrapForm.Check className="px-2">Fiat</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "kia", "")}>
                                            <BootstrapForm.Check onChange={() => setOption2("option4")} type="radio" name="group2" checked={option2 === "option4"} id="label2" />
                                            <BootstrapForm.Check className="px-2">Kia</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "renault", "")}>
                                            <BootstrapForm.Check onChange={() => setOption2("option5")} type="radio" name="group2" checked={option2 === "option5"} id="label2" />
                                            <BootstrapForm.Check className="px-2">Renault</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "ford", "")}>
                                            <BootstrapForm.Check onChange={() => setOption2("option6")} type="radio" name="group2" checked={option2 === "option6"} id="label2" />
                                            <BootstrapForm.Check className="px-2">Ford</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                    </div>
                                    <div className="px-3 py-2">
                                        <button class="clear-btn" type="button" id="car-marque" onClick={() => clearCarProperty("car_marque", "two")}>Clear</button>
                                    </div>

                                </div>

                                <div className="car-type py-4 border-bottom">
                                    <h3 className="title fs-5">Type de Voiture</h3>
                                    <div className="text-start px-3 py-2">
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "", "sedan")}>
                                            <BootstrapForm.Check type="radio" onChange={() => setOption3("option1")} checked={option3 === "option1"} name="group3" id="label3" />
                                            <BootstrapForm.Check className="px-2">SEDAN</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "", "suv")}>
                                            <BootstrapForm.Check type="radio" onChange={() => setOption3("option2")} checked={option3 === "option2"} name="group3" id="label3" />
                                            <BootstrapForm.Check className="px-2">SUV</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "", "utilaire")}>
                                            <BootstrapForm.Check type="radio" onChange={() => setOption3("option3")} checked={option3 === "option3"} name="group3" id="label3" />
                                            <BootstrapForm.Check className="px-2">UTILAIRE</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "", "sportive")}>
                                            <BootstrapForm.Check type="radio" onChange={() => setOption3("option4")} checked={option3 === "option4"} name="group3" id="label3" />
                                            <BootstrapForm.Check className="px-2">SPORTIVE</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                        <BootstrapForm.Label className="d-flex flex-row text-secondary" onClick={() => demo("", "", "familiaire")}>
                                            <BootstrapForm.Check type="radio" onChange={() => setOption3("option5")} checked={option3 === "option5"} name="group3" id="label3" />
                                            <BootstrapForm.Check className="px-2">FAMILIAIRE</BootstrapForm.Check>
                                        </BootstrapForm.Label>
                                    </div>
                                    <div className="px-3 py-2">
                                        <button class="clear-btn" type="button" id="car-type" onClick={() => clearCarProperty("car_type", "three")}>Clear</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="row">
                                {cars?.length ? (cars.map((elem) => {
                                    const { _id, photos, name, places, carMarque, fuel, km, type, pricePerDay } = elem;
                                    return (
                                        <CardItem key={_id} id={_id} url={photos[0]} marque={carMarque} title={name} seats={places} fuel={fuel} distance={km} type={type} price={pricePerDay} />
                                    );
                                })) : !isLoading && <h3 className="w-100 text-center pt-3">pas de voiture avec ces caracteristiques</h3>}
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Voitures;