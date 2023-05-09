import React from "react";

export const MidContainercomponent = ({alsoBuy, name, description, category}) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 col-lg-8 mb-4">
                    <h3><strong>{name}</strong></h3>
                    <h3>{category}</h3>
                    <p>
                        {description}
                    </p>
                </div>
                <div className="col-lg-4 mr-auto mb-5 mb-lg-0">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="footer-heading mb-4">People also buy</h3>
                        </div>
                        {
                            alsoBuy.map(item => {
                                return(
                                    <div className="col-lg-4 col-md-6 item-entry mb-4" key={item._id}>
                                            <img src={item.image.src} alt={item.image.alt} className="img-fluid same-size"/>

                                        <h2 className="item-title">{item.category}</h2>
                                        <strong className="item-name">{item.name}</strong>
                                        <h2 className="item-title">${item.price}</h2>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <hr/>
        </div>
    )
}