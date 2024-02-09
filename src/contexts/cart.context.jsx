import { useState, createContext } from "react";

export const CartContext = createContext(
    {
        cart: [],
        isCartOpen: false,
        setIsCartOpen: () => {}
    }
);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const value = {isCartOpen, setIsCartOpen};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}