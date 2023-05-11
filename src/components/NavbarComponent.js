import React, {useState} from "react";
import {FaBeer, FaShoppingCart} from "react-icons/fa";

export const NavbarComponent = ({name}) => {
    const [showProductsModal, setShowProductsModal] = useState(false);
    const productsCart = JSON.parse(localStorage.getItem('productsCart'));

    const handleShowProductsModal = () => {
        setShowProductsModal(true);
    }

    const handleCloseProductsModal = () => {
        setShowProductsModal(false);
    }

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
                        <div style={{position: "relative"}}>
                            <a className="icons-btn d-inline-block bag me-5" onMouseEnter={handleShowProductsModal}>

                                {
                                    productsCart.length > 0 ? (
                                        <span className="number">{productsCart.length}</span>
                                    ) : (
                                        ''
                                    )}

                            </a>
                            <a className="icons-btn d-inline-block bag">
                                <span><FaShoppingCart size="2em"/></span>
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

            {showProductsModal && (
                <div className="products-modal">
                    <div className="modal-overlay" onClick={handleCloseProductsModal}></div>
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                    onClick={handleCloseProductsModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        {productsCart.map(product => (
                            <div className="row" key={product._id}>
                                <div className="col-lg-6 col-md-6 item-entry mb-4">
                                    <strong className="item-name cart-text">{product.name}</strong>
                                    <h2 className="item-title">${product.price}</h2>
                                </div>
                                <div className="col-lg-4 col-md-4 mb-4">
                                    <img
                                        className="img-product-cart"
                                        src={product.image.src}
                                    />
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-black-cart rounded-0">Clear</button>
                    </div>
                </div>
            )}

        </div>
    );
}