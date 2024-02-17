import { Container, Form, Row } from "react-bootstrap";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import "../styles/Contacter.css";
import { useFormik } from "formik";
import { contactSchema } from "../Configuration/Schema";
import { useHeaderContentQuery, useSendEmailMutation, useSendMessageWithEmailMutation } from "../Configuration/api";
import { ToastContainer, toast } from "react-toastify";
import { useLayoutEffect } from "react";


function Contacter() {
    const { data } = useHeaderContentQuery();
    const [sendMessageWithEmail] = useSendMessageWithEmailMutation();
    const onSubmit = async (values, actions) => {
        await actions.resetForm({
            values: {
                name: "",
                email: "",
                message: ""
            }
        });
        
        const res = await sendMessageWithEmail(values);
        
        if (res.data.success) {
            toast.success("Message Envoyer Succes");
            return false;
        } else {
            toast.error("Message Pas Envoyer");
            return false;
        }
    }

    useLayoutEffect(() => {
        document.title = "Contacter";
        window.scrollTo(0, 0);
    }, []);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validationSchema: contactSchema,
        onSubmit,
    });

    return (
        <section className="contact-section py-4 bg-light">
            <ToastContainer />
            <Container>
                <div className="">
                    <h2 className="title text-center py-4">Contacter</h2>
                </div>
                <Row className="py-5">
                    <div className="col-12 col-md-6 py-4">
                        <div className="d-flex flex-row justify-content-center align-items-center gap-4 py-3">
                            <FontAwesomeIcon icon={faPhone} className="fs-5" />
                            <h6 className="mt-1 fs-5">{data?.tel}</h6>
                        </div>
                        <div className="d-flex flex-row justify-content-center align-items-center gap-4 py-3">
                            <FontAwesomeIcon icon={faEnvelope} className="fs-5" />
                            <h6 className="mt-1 fs-5">{data?.email}</h6>
                        </div>
                        <div style={{ borderRadius: "5px" }} className="border d-flex flex-column justify-content-center align-items-center gap-4 py-4">
                            <h4 className="title">D'après Nous...</h4>
                            <p className="lead px-4">{data?.description}</p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 py-4">
                        <Form className="d-flex flex-column gap-2" onSubmit={handleSubmit}>
                            <Form.Control type="text" placeholder="Nom" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name}></Form.Control>
                            {errors.name && touched.name && <p className="text-danger fs-6 px-2">{errors.name}</p>}
                            <Form.Control type="text" placeholder="E-mail" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}></Form.Control>
                            {errors.email && touched.email && <p className="text-danger fs-6 px-2">{errors.email}</p>}
                            <textarea type="text" placeholder="Message" name="message" onChange={handleChange} onBlur={handleBlur} className="py-2" value={values.message} style={{ height: "180px", width: "100%", borderRadius: "5px", border: "solid 1px #ccc", padding: "10px 14px" }}></textarea>
                            {errors.message && touched.message && <p className="text-danger fs-6 px-2">{errors.message}</p>}
                            <Form.Control type="submit" className="form-submit-btn" value="Submit" disabled={isSubmitting} />
                        </Form>
                    </div>
                </Row>
            </Container>
        </section>
    );
}

export default Contacter;