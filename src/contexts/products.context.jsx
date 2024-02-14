import {useState, createContext, useEffect} from 'react';

import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';

//context
export const ProductsContext = createContext(
    {
        products: [],
    }
);



//component
export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); //ONLY USED HERE FOR TESTING AND ADDING DATA INITIALLY
    const value = {products};

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}