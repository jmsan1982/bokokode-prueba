import React from "react";

export const NavbarComponent = ({name}) => {
    return (
        <div className="site-navbar bg-white py-2 mb-2">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <div className="site-logo">
                            <a href="index.html">Bejamas_</a>
                        </div>
                    </div>

                    <div className="icons">
                        <a href="cart.html" className="icons-btn d-inline-block bag">
                            <span className="icon-shopping-bag">bolsa</span>
                            <span className="number">2</span>
                        </a>
                        <a href="#" className="icons-btn d-inline-block"><span className="icon-heart-o">cesta</span></a>
                    </div>
                </div>
                <hr/>
            </div>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3>{name}</h3>
                    </div>
                    <div>
                        <a href="#" className="btn btn-black rounded-0">Add To Card</a>
                    </div>
                </div>
            </div>

        </div>

    )
}