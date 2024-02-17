import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import { useDislikedCarsMutation } from '../Configuration/api';

function DislikeCars() {
    const [dislikeCars, setDislikeCars] = useState([]);
    const [dislike] = useDislikedCarsMutation();
    const adminKey = localStorage.getItem("adminKey") || null;

    useLayoutEffect(() => {
        document.title = "Voitures Signalés";
    }, []);

    useEffect(() => {
        const getDislikedCars = async () => {
            const res = await dislike({ adminKey });
            console.log(res);
            if (res?.data?.success) {
                setDislikeCars(res.data.cars);
            } else {
                toast.error("Error Fetching The Data");
            }
        }
        getDislikedCars();
    }, []);
    return (
        <section className="py-5 bg-light" style={{ minHeight: "96vh" }}>
            <ToastContainer />
            <Container>
                <div>
                    <h2 className="pb-3 pt-1">Disliked Cars</h2>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Car</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dislikeCars?.map((dislike) => (
                                <tr key={dislike._id}>
                                    <td>
                                        Nom: {dislike.userId.username}
                                        <br />
                                        Email: {dislike.userId.email}
                                    </td>
                                    <td>{dislike.carId.name}</td>
                                    <td>{dislike.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
        </section>
    )
}

export default DislikeCars;