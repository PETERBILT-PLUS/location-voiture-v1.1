import React, { useEffect, useState } from "react";
import { useChangeAgenceDetailMutation } from "../Configuration/api";


function Footer() {
    const adminKey = localStorage.getItem("adminKey") || "";
    const [about, setAbout] = useState("");
    const [changeAgence] = useChangeAgenceDetailMutation();
    useEffect(() => {
    });
    return (
        <footer class="text-center text-lg-start pt-4 text-secondary">

            <div class="container p-4">

                <div class="row">

                    <div class="col-lg-6 col-md-6 mb-4 mb-lg-0">
                        <h5 class="text-uppercase mb-4">A propos de nous</h5>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus temporibus non magni repudiandae similique.</p>
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <h5 class="text-uppercase mb-4">Abonner vous a la newsletter</h5>
                        <div className="col-12 text-center mini-form">
                            <input type="email" className="email-input col-12" placeholder="Email adress" />
                            <button className="col-12 mt-2">S'inscrire</button>
                            <p className="text-secondary text-start fs-6 pt-2">Inscrire pour obtenir les nouvelles.</p>
                        </div>
                    </div>
                     
                </div>
            </div>

            <div class="text-center p-3 border-top py-4">
                © 2023 Copyright:
            </div>

        </footer>
    );
}

export default Footer;