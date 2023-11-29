import React from "react";
import Peoples from "../Images/users-solid.svg";
import Fuel from "../Images/gas-pump-solid.svg";
import Km from "../Images/gauge-high-solid.svg";
import Car from "../Images/car-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../Configuration/main";
import { useAddCarMutation } from "../Configuration/api.js";


function VoitureProperty({ first, second, thirt, fourth, id }) {
    const user_id = useSelector((state) => state.user.user.currentUser._id);
    //const car_id = id;

    const [addCarApi] = useAddCarMutation();

    const addCar = async () => {
        const res = await addCarApi({ user_id, /*car_id*/ });
        console.log(res);
    }
    
    return (
        <div className="row">
            <div className="d-flex flex-row align-items-start col-12 col-md-6 row px-4 py-4">

                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Peoples} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{first ||null} palces</p>
                </div>
                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Fuel} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{second ||null}</p>
                </div>
                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Km} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{thirt} km</p>
                </div>
                <div className="col-6 m-auto d-flex flex-row justify-content-center gap-2 py-2 my-2 px-4">
                    <img src={Car} alt="img" className="col-2 col-md-3" />
                    <p className="col-9 m-auto title">{fourth}</p>
                </div>
            </div>
            <div className="col-12 col-md-6 px-4 py-4 text-align-center">
                <div className="btns col-12 py-4 text-align-center d-flex flex-row justify-content-center">
                    <button className="accept margin-auto" onClick={addCar}>Demander</button>
                    <button className="reject margin-auto">Signaler</button>
                </div>
                <div className="comment py-4 text-align-center">
                    <textarea className="col-12"></textarea>
                    <button className="col-12">Send</button>
                </div>
            </div>
        </div>
    );
}

export default VoitureProperty;