import React, {useState} from "react";

export const SiteBlockComponent = ({imageData}) => {
    const image = imageData;
    return (
        <div className="site-blocks-cover mb-5" data-aos="fade">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 order-1 align-self-end">
                        <img src={image.src} alt={image.alt}/>
                    </div>
                </div>
            </div>
        </div>
    )
}