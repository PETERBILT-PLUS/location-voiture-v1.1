import { useFormik } from "formik";
import { Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../Configuration/Schema";
import GoogleAuth from "./GoogleAuth";
import { useRegisterMutation } from "../Configuration/api";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Register.css";



function Register() {
    const navigate = useNavigate();
    const [register] = useRegisterMutation();


    const onSubmit = async (values, actions) => {
        try {
            const res = await register({
                username: values.username,
                email: values.email,
                password: values.password
            });

            if (res.data.success) {
                actions.resetForm();
                toast.success("Registrement Succes");
                await new Promise((resolve) => setTimeout(resolve, 2000));
                navigate("/login", { relative: "path" });
            }
            console.log(res);

        } catch (error) {
            console.log(error);
        }

    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }, validationSchema: registerSchema, onSubmit
    });


    return (
        <>
            <section className="regist-section py-4 bg-light">
                <Container>

                    <h2 className="title text-center py-5">Register</h2>
                    <ToastContainer />
                    <Row className="w-100 mx-auto">
                        <Form onSubmit={handleSubmit} autoComplete="off" style={{ borderRadius: "5px" }} className="border col-12 col-md-8 col-lg-4 m-auto pt-3 pb-5 px-4">
                            <Form.Control value={values.username} onChange={handleChange} onBlur={handleBlur} type="text" className="py-2 my-3" placeholder="Nom" name="username" />
                            {errors.username && touched.username && <p className="text-danger fs-6 px-2">{errors.username}</p>}
                            <Form.Control value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" className="py-2 my-3" placeholder="E-mail" name="email" />
                            {errors.email && touched.email && <p className="text-danger fs-6 px-2">{errors.email}</p>}
                            <Form.Control value={values.password} onChange={handleChange} onBlur={handleBlur} type="password" className="py-2 my-3" placeholder="password (min 5)" name="password" />
                            {errors.password && touched.password && <p className="text-danger fs-6 px-2">{errors.password}</p>}
                            <Form.Control value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} type="password" className="py-2 my-3" placeholder="Confirmer password" id="confirmPassword" />
                            {errors.confirmPassword && touched.confirmPassword && <p className="text-danger fs-6 px-2">{errors.confirmPassword}</p>}
                            <Form.Control type="submit" disabled={isSubmitting} className="btn-submit" />
                            <GoogleAuth />
                            <p className="mt-4 mb-0">Vous Avez Déja Un Compte? <Link to="/login">Login</Link></p>
                        </Form>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Register;