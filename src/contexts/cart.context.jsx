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
            ? ((item.id.quantity === 1) ? deleteCartItem(cartItems, productToRemove) : {...item, quantity: item.quantity-1})
            : item
        );
    }
}

const deleteCartItem = (cartItems, deleteItem) => {
    console.log(cartItems.filter(item => item !== deleteItem));
    return cartItems.filter(item => item !== deleteItem);

}

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

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const deleteItemFromCart = (deleteItem) => {
        setCartItems(deleteCartItem(cartItems, deleteItem));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, deleteItemFromCart};

    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}