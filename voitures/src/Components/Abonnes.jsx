import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Container, Table } from 'react-bootstrap';
import { useGetAbonnesMutation } from '../Configuration/api';
import { ToastContainer, toast } from 'react-toastify';


function Abonnes() {
    const [abonnes] = useGetAbonnesMutation();
    const [myAbonnes, setMyAbonnes] = useState([]);
    const adminKey = localStorage.getItem("adminKey") || null;

    useLayoutEffect(() => {
        document.title = "Mes Abonnés";
    }, []);

    useEffect(() => {
        try {
            const getAbonnes = async () => {
                const res = await abonnes({ adminKey });
                console.log(res);
                if (res?.data?.success) {
                    setMyAbonnes(res.data.abonnes);
                } else {
                    toast.error("Error Fetching The Data");
                }
            }
            getAbonnes();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <section className="py-5 bg-light" style={{ minHeight: "96vh" }}>
            <ToastContainer />
            <Container>
                <h2 className="py-5 title display-5 text-center">Les Abonnés</h2>
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>Email:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myAbonnes?.map((elem) => {
                            const { email } = elem;
                            return (
                                <tr>
                                    <td>{email}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </section>
    )
}

export default Abonnes;