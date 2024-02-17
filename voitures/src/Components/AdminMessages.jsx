import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Container, Table } from 'react-bootstrap';
import { useGetForAdminMessageMutation } from '../Configuration/api';
import { ToastContainer, toast } from 'react-toastify';


function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [getMessagesServer] = useGetForAdminMessageMutation();
    const adminKey = localStorage.getItem("adminKey") || null;

    useLayoutEffect(() => {
        document.title = "Clients Messages";
    }, []);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await getMessagesServer({ adminKey });
                console.log(res);
                if (res.data.success) {
                    setMessages(res.data.messages);
                } else {
                    toast.error("Error Fetching The Data");
                }
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()
    }, []);

    return (
        <section className="py-5 bg-light" style={{ minHeight: "96vh" }}>
            <ToastContainer />
            <Container>
                <h2 calssName="title display-5 text-center py-5">Messages</h2>
                <Table striped bordered responsive hover>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages?.map((elem) => {
                            const { name, email, message } = elem;
                            return (
                                <tr>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{message}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </section>
    )
}

export default AdminMessages;