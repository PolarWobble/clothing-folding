import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles.jsx';

const Checkout = () => {
    const {cartItems, cartSum} = useContext(CartContext);

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            <div>
                {cartItems.map((item) => (
                    <CheckoutItem key={item.id} item={item}/>
                ))}
            </div>
            <Total>TOTAL: €{cartSum}</Total>
        </CheckoutContainer>
    )
    
}

export default Checkout;