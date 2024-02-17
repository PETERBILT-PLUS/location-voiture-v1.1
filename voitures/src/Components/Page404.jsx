import React, { useLayoutEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "../styles/page404.css";


function Page404() {
    useLayoutEffect(() => {
        document.title = "Page 404"
    }, []);
    return (
        <section className="py-5 bg-light page404">
            <Container>
                <h2 className="display-5 title text-center py-2">PAGE 404 NOT FOUND</h2>
                <p className="lead text-center py-3">
                    Désolé, la page que vous recherchez n'existe pas. Veuillez vérifier l'URL ou essayer de revenir à la page d'accueil.
                </p>

                <div className="text-center py-3"> {/* Centering the button */}
                    <Link to="/"><button className="home-btn">Retourner à l'accueil</button></Link>
                </div>
            </Container>
        </section>
    );
}

export default Page404;