import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";


import './checkout.styles.scss';

const Checkout = () => {
    const {cartItems, addItemToCart} = useContext(CartContext);
    //const {name, quantity, price, imageUrl} = cartItems;

    return(
        <div>
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <div className=''>
                        <img src={item.imageUrl} alt={`${item.name}`} />
                        <div className=''>
                            <span className=''>{item.name}</span>
                            <span className=''>{item.quantity} x €{item.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Checkout;