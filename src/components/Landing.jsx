import React from 'react';
import 'bulma/css/bulma.min.css';
import Background from '../img/inventory_management.png';

function Landing() {
    return (
        <div className="main">
            <nav class="navbar is-light" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        &nbsp; <strong>Warehouse Management</strong>
                    </a>
                </div>
            </nav>

            <section class="hero is-dark is-fullheight" style={{
                backgroundImage: `url(${Background})`, backgroundSize: 'cover'
            }}>
                <div class="hero-body" ></div>
            </section >
            <div class="container">
                <a href="/submit_form" class="button is-primary is-large my-4"> <strong> Add warehouse &nbsp; </strong></a>
            </div>
        </div >
    );
}

export default Landing;
