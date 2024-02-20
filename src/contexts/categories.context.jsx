import {useState, createContext, useEffect} from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

//context export
export const CategoriesContext = createContext(
    {
        categoriesMap: {},
    }
);

//component
export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({}); //empty object instead of null, more often empty state of a map
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []); //ONLY USED HERE FOR TESTING AND ADDING DATA INITIALLY (DO NOT DO THIS FROM FRONT END)

    useEffect(() => {
        //getCategoriesAndDocuments is async, since in useEffect => need to create new async function and call it at the bottom
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    const value = {categoriesMap};

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}