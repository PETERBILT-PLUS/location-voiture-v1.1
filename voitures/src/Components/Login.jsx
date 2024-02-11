import { useFormik } from "formik";
import { Container, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../Configuration/api";
import { loginUser } from "../Configuration/main";
import { loginSchema } from "../Configuration/Schema";
import "../styles/Register.css";
import GoogleAuth from "./GoogleAuth";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginin] = useLoginMutation();

    const onSubmit = async (values, actions) => {
        try {
            const res = await loginin({
                email: values.email,
                password: values.password,
            });
            if (res.data.success) {
                actions.resetForm();
                toast.success("Login Succes");
                dispatch(loginUser(res.data));
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            email: "",
            password: "",
        }, validationSchema: loginSchema,
        onSubmit,
    });

    return (
        <>
            <section className="regist-section d-flex flex-row justify-content-center py-4 bg-light">
                <Container>
                    <ToastContainer />
                    <h2 className="title text-center py-5">Login</h2>
                    <Row className="w-100 mx-auto">
                        <Form onSubmit={handleSubmit} autoComplete="off" style={{ borderRadius: "5px" }} className="border col-12 col-md-8 col-lg-5 m-auto pt-3 pb-5 px-4">
                            <Form.Control value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" className="py-2 my-3" placeholder="E-mail" name="email" />
                            {errors.email && touched.email && <p className="text-danger fs-6 px-2">{errors.email}</p>}
                            <Form.Control value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" className="py-2 my-3" placeholder="password" name="password" />
                            <Form.Control type="submit" disabled={isSubmitting} className="btn-submit mt-5" />
                            <GoogleAuth />
                            <p className="mt-4 mb-0">Vous Avez Pas De Compte? <Link to="/register">Register</Link></p>
                        </Form>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Login;