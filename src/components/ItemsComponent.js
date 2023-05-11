import React, {useEffect, useState} from "react";

export const ItemsComponent = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [errors, setErrors] = useState("");
    const [sortKey, setSortKey] = useState('name');
    const [sortType, setSortType] = useState('ASC');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const getProductsPage = async () => {
        try {
            let settings = {};
            if (selectedCategories.length > 0){
                settings = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sort: {
                            key: sortKey,
                            type: sortType,
                        },
                        categories: selectedCategories,
                    }),
                };
            }else{
                settings = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sort: {
                            key: sortKey,
                            type: sortType,
                        },
                    }),
                };

            }

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
    }, [currentPage, sortType, sortKey,selectedCategories])

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

    function handleCategoryChange(e) {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter((c) => c !== value));
        }
    }

    function hanleSaveProductStorage(product){
        let productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
        productsCart.push(product);
        localStorage.setItem('productsCart', JSON.stringify(productsCart));
        window.location.reload();
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
                    <label className="me-2 pointer-image" onClick={handleSortPrice}><strong>Price</strong></label>
                    <label className="pointer-image" onClick={handleSortName}><strong>Name</strong></label>
                </div>

                <div className="col-md-5 col-lg-5 mb-4">
                    <h6><strong>Category</strong></h6>
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            value="people"
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">People</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            value="premium"
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">Premium</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            value="pets"
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">Pets</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            value="food"
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">Premium</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            value="landmarks"
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">Landmarks</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            value="cities"
                            onChange={handleCategoryChange}
                        />
                        <label className="form-check-label">Cities</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            value="nature"
                            onChange={handleCategoryChange}/>
                        <label className="form-check-label">Nature</label>
                    </div>
                </div>

                <div className="col-md-7 col-lg-7 mb-4">
                    <div className="row">

                        {
                            products.map(item => {
                                return(
                                    <div className="col-lg-4 col-md-6 item-entry mb-4" key={item._id}>
                                        <img
                                            src={item.image.src}
                                            alt={item.image.alt}
                                            className="img-fluid same-size-product pointer-image"
                                            onMouseOver={() => setHoveredProductId(item._id)}
                                            onMouseOut={() => setHoveredProductId(null)}
                                            onClick={() => hanleSaveProductStorage(item)}
                                        />
                                        {item.bestseller && (
                                            <span>Best Seller</span>
                                        )}
                                        {hoveredProductId === item._id && (
                                            <button className="btn btn-black rounded-0 add-to-cart">Add to Cart</button>
                                        )}
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