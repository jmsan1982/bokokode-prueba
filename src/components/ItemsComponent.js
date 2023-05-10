import React, {useEffect, useState} from "react";
import {CategoryComponent} from "./CategoryComponent";

export const ItemsComponent = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [errors, setErrors] = useState("");
    const [sortKey, setSortKey] = useState('name');
    const [sortType, setSortType] = useState('ASC');
    const getProductsPage = async () => {
        try {
            const settings = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sort: {
                        key: sortKey,
                        type: sortType,
                    },
                }),
            };
            const response = await fetch(`https://technical-frontend-api.bokokode.com/api/products?page=${currentPage}`, settings);
            const {data} = await response.json();

            setProducts(data.data);
            setLastPage(data.last_page);

        } catch (error) {
            setErrors(error)
        }
    }
    useEffect(() => {
        getProductsPage()
    }, [currentPage, sortType, sortKey])

    function handlePrevPage() {
        setCurrentPage(currentPage - 1);
    }

    function handleNextPage() {
        setCurrentPage(currentPage + 1);
    }

    function handleSortPrice() {
        handleSort('price');
    }

    function handleSortName() {
        handleSort('name');
    }

    function handleSort(type){
        const newSortType = sortType === 'ASC' ? 'DESC' : 'ASC';
        const newSortKey = type;
        setSortType(newSortType);
        setSortKey(newSortKey);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 col-lg-5 mb-4">
                    <h2><strong>Photografy /</strong> Premium Photos</h2>
                </div>
                <div className="col-md-7 col-lg-7 mb-4">
                    <label htmlFor="sort by"
                           className="col-form-label text-md-right me-2">Sort By</label>
                    <label className="me-2" onClick={handleSortPrice}><strong>Price</strong></label>
                    <label onClick={handleSortName}><strong>Name</strong></label>
                </div>

                <CategoryComponent />

                <div className="col-md-7 col-lg-7 mb-4">
                    <div className="row">

                        {
                            products.map(item => {
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
                    <div className="row">
                        <div className="col-md-1">
                            {currentPage > 1 && <button className="btn-paginate" onClick={handlePrevPage}>Prev</button>}
                        </div>
                        <div className="col-md-1">
                            {currentPage < lastPage && <button className="btn-paginate" onClick={handleNextPage}>Next</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}