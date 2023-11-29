import { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useChangeAgenceDetailMutation } from "../Configuration/api";

function AgenceDetail() {
    const adminKey = localStorage.getItem("adminKey") || "";
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [changeAgence] = useChangeAgenceDetailMutation();
    useEffect(() => {
        const fetchDetails = async () => {
            const res = await changeAgence({ adminKey, tel, email, description });
            console.log(res);
            if (res.data.success) {
                setTel(res.data.agenceDetail.tel);
                setEmail(res.data.agenceDetail.email);
                setDescription(res.data.agenceDetail.description);
            } else {
                setTel("Pas autorisée");
                setEmail("Pas autorisée");
                setDescription("Pas autorisée");
            }
        }
        fetchDetails();
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await changeAgence({ adminKey, tel, email, description });
        if (res.data.success) {
            toast.success("Votre Compte Est Ameliorer");
        }
    }
    return (
        <section style={{ minHeight: "100vh", maxHeight: "auto" }} className="agence-section py-5 bg-light">
            <Container>
                <ToastContainer /> 
                <Row>
                    <h2 className="title text-center py-5">Agence Detail</h2>
                    <div className="col-10 col-sm-10 col-md-6 col-lg-4 mx-auto">
                        <Form style={{ borderRadius: "10px" }} onSubmit={handleSubmit} className="border px-3 py-4 d-flex flex-column gap-2 py-3">
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" name="email"></Form.Control>
                            <Form.Control value={tel} onChange={(e) => setTel(e.target.value)} type="tel" placeholder="Telephone" name="tel"></Form.Control>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Message" name="description" className="py-2" style={{ height: "180px", width: "100%", borderRadius: "5px", border: "solid 1px #ccc", padding: "10px 14px" }}></textarea>
                            <Form.Control type="submit" value="Submit" />
                        </Form>
                    </div>
                </Row>
            </Container>
        </section>
    );
}

export default AgenceDetail;