import { Button, Form } from "react-bootstrap";
import { app } from "../Configuration/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import "../styles/Register.css";
import { useGoogleMutation } from "../Configuration/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../Configuration/main";
import { useNavigate } from "react-router-dom"

function GoogleAuth() {
    const [googleSign] = useGoogleMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const google = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const { displayName, email } = result.user;
            const res = await googleSign({
                username: displayName,
                email: email,
            });
            if (res.data.success) {
                const userCreated = () => toast.success("Login accepté");
                userCreated();
                console.log(res.data);
                dispatch(loginUser(res.data));
                alert("Votre password est:\n " + res.data.password);
                await new Promise((resolve) => setTimeout(resolve, 3500));
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form.Control onClick={google} type="button" value="Continue avec Google" className="btn-google text-center btn-danger my-2" />
    );
}

export default GoogleAuth;