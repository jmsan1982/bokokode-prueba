import './App.css';
import {NavbarComponent} from "./components/NavbarComponent";
import {SiteBlockComponent} from "./components/SiteBlockComponent";
import {useEffect, useState} from "react";
import {MidContainercomponent} from "./components/MidContainercomponent";
import {ItemsComponent} from "./components/ItemsComponent";


function App() {
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState("");
    const [imageData, setImageData] = useState([]);
    const [alsoBuy, setAlsoBuy] = useState([]);
    const [featuredName, setFeaturedName] = useState("");
    const [featuredDescription, setFeaturedDescription] = useState("");
    const [category, setCategory] = useState("");
    const getProducts = async () => {
        try {
            const settings = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            const response = await fetch('https://technical-frontend-api.bokokode.com/api/products', settings);
            const {data} = await response.json();


            setProducts(data.data);

        } catch (error) {
            setErrors(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

    useEffect(() => {
        if (products.length > 0 && products[0].featured === true) {
            setImageData(products[0].image)
            setAlsoBuy(products[0].people_also_buy)
            setFeaturedName(products[0].name)
            setFeaturedDescription(products[0].description)
            setCategory(products[0].category)
        }
    })

    return (
        <div className="App">
            <div className="site-wrap">

                <NavbarComponent
                    name={featuredName}
                />

                <SiteBlockComponent
                    imageData={imageData}
                />

                <MidContainercomponent
                    alsoBuy={alsoBuy}
                    name={featuredName}
                    description={featuredDescription}
                    category={category}
                />

                <ItemsComponent/>

            </div>
        </div>
    );
}

export default App;
