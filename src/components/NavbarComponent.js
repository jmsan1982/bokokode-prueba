import React from "react";
import {FaBeer, FaShoppingCart} from "react-icons/fa";

export const NavbarComponent = ({name}) => {
    const productsCart = JSON.parse(localStorage.getItem('productsCart'));

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
                        <div>
                            <a className="icons-btn d-inline-block bag me-5">

                                {
                                    productsCart.length > 0 ?(
                                        <span className="number">{productsCart.length}</span>
                                    ) : (
                                        ''
                                    )}

                            </a>
                            <a className="icons-btn d-inline-block bag">
                                <span><FaShoppingCart size="2em" /></span>
                            </a>
                        </div>


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