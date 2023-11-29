import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import Data from "./Data";
import VoitureProperty from "./VoitureProperty";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import "../styles/Voitures.css";
import { useGetCarMutation } from "../Configuration/api";


function VoitureDetail() {
    const params = useParams();
    const [car, setCar] = useState({});
    console.log(car.photos);
    const { pathname } = useLocation();
    const [getSingleCar] = useGetCarMutation();
    useEffect(() => {
        const getSingle = async () => {
            console.log(params.car);
            const res = await getSingleCar({ car_id: params.car });
            console.log(res.data);
            if (res.data?.success) {
                setCar(res.data?.car);
            } else {
                alert("Desolé une error ressayer");
            }
        }
        getSingle();
    }, []);

    const [state, setState] = useState("");
    const [slide, setSlide] = useState(null);


    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });
    useLayoutEffect(() => {
        let width = document.documentElement.clientWidth;
        if (width < 768) {
            setSlide(1);
        } else {
            setSlide(3);
        }
        // One For the Slide and the other for the container
        if (width > 1700) {
            setState("container");
        }
        else {
            setState("");
        };
    })
    window.onresize = () => {
        let width = document.documentElement.clientWidth;

        if (width < 768) {
            setSlide(1);
        } else {
            setSlide(3);
        }
        // One For the Slide and the other for the container

        if (width > 1700) {
            setState("container");
        }
        else {
            setState("");
        };
    }

    return (
        <section className="voiture-detail py-5 pt-0 bg-light">
            <div className={state}>
                <Swiper
                    slidesPerView={slide}
                    spaceBetween={0}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper text-center px-3"
                >
                    {car.photos?.map((elem, index) => {
                        console.log(elem);
                        return (
                            <SwiperSlide className="swiperSlide"><img style={{height: "280px",}} src={elem} alt="voiture photo" /></SwiperSlide>
                        );
                    })}

                </Swiper>
            </div>
            <Container>
                <div className="info py-4">
                    <h2 className="display-4 py-5">{car?.name}</h2>
                    <div className="d-flex flex-row py-4 text-center">
                        <VoitureProperty first={car?.places} second={car?.fuel} thirt={car?.km} fourth={car?.type} id={car?._id} />
                    </div>
                </div>
            </Container>

        </section >
    );
}

export default VoitureDetail;