import { useState, createContext, useEffect } from "react";


const doesCartItemExists = (cartItems, specificItem) => {
    return cartItems.find((cartItem) => cartItem.id === specificItem.id);
}

const addCartItem = (cartItems, productToAdd) => {
    
    const cartItemExists = doesCartItemExists(cartItems, productToAdd);
    //const cartItemExists = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (cartItemExists) {
        return cartItems.map((item) => item.id === productToAdd.id 
            ? {...item, quantity: item.quantity+1}
            : item
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
    const cartItemExists = doesCartItemExists(cartItems, productToRemove);

    if(cartItemExists) {
        return cartItems.map((item) => item.id === productToRemove.id 
            ? {...item, quantity: item.quantity-1}
            : item
        );
    }
}

const deleteCartItem = (cartItems, deleteItem) => {
    return cartItems.filter(item => item !== deleteItem);
}

export const CartContext = createContext(
    {
        cartItems: [],
        addItemToCart: () => {},
        removeItemFromCart: () => {},
        deleteItemFromCart: () => {},
        isCartOpen: false,
        setIsCartOpen: () => {},
        cartCount: 0,
        cartSum: 0,
    }
);

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartSum, setCartSum] = useState(0);

    //update item count in cart
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    //update price total in cart
    useEffect(() => {
        const newCartSum = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0)
        setCartSum(newCartSum);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const deleteItemFromCart = (deleteItem) => {
        setCartItems(deleteCartItem(cartItems, deleteItem));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, deleteItemFromCart, cartSum};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}