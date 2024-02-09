import { useState, createContext, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const cartItemExists = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (cartItemExists) {
        return cartItems.map((item) => item.id === productToAdd.id 
            ? {...item, quantity: item.quantity+1}
            : item
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

export const CartContext = createContext(
    {
        cartItems: [],
        addItemToCart: () => {},
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartCount: 0,
    }
);

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}