import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { ProductsContext } from "../../contexts/products.context";

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () => {
    const {cartItems, addItemToCart, removeItemFromCart} = useContext(CartContext);

    return(
        <div>
            <div className="heading">
                <h2>Product</h2>
                <h2>Description</h2>
                <h2>Quantity</h2>
                <h2>Price</h2>
                <h2>Remove</h2>
            </div>
            <div className='checkout-items'>
                {cartItems.map((item) => (
                    <CheckoutItem key={item.id} item={item}/>
                ))}
            </div>
        </div>
    )
    
}

export default Checkout;