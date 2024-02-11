import { useState } from "react";
import { useSendEmailMutation } from "../Configuration/api.js";
import { ToastContainer, toast } from "react-toastify";


function Footer() {
    const [email, setEmail] = useState("");
    const [sendEmailMutation] = useSendEmailMutation();
    function isValidEmail(email) {
        // Regular expression for validating an email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const sendEmail = async (email) => {
        try {
            if (isValidEmail(email)) {
                const res = await sendEmailMutation({ email });
                console.log(res);
                if (res.data.success) {
                    toast.success("Vous aver Abonner à la newsletter");
                } else {
                    toast.error("Envoyer Pas Succes...");
                }
            } else {
                toast.warning("Entrer Des Caracteres Email");
            }
        } catch (error) {
            toast.error("Envoyer Pas Succes...");
            console.log(error);
        }
    }
    return (
        <footer class="text-center text-lg-start pt-4 text-secondary">
            <ToastContainer />
            <div class="container p-4">

                <div class="row">

                    <div class="col-lg-6 col-md-6 mb-4 mb-lg-0">
                        <h5 class="text-uppercase mb-4">A propos de nous</h5>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus temporibus non magni repudiandae similique.</p>
                    </div>

                    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <h5 class="text-uppercase mb-4">Abonner vous a la newsletter</h5>
                        <div className="col-12 text-center mini-form">
                            <input type="email" className="email-input col-12" onChange={(e) => setEmail(e.target.value)} placeholder="Email adress" />
                            <button className="col-12 mt-2" onClick={() => sendEmail(email)}>S'inscrire</button>
                            <p className="text-secondary text-start fs-6 pt-2">Inscrire pour obtenir les nouvelles.</p>
                        </div>
                    </div>

                </div>
            </div>

            <div class="text-center p-3 border-top py-4">
                © 2024 Copyright
            </div>

        </footer>
    );
}

export default Footer;