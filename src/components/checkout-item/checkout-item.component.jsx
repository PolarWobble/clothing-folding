import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {CheckoutItemContainer, ImageContainer, BasicSpan, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles';

const CheckoutItem = ({item}) => {

    const {name, price, imageUrl, quantity} = item;
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext);
    
    const removeProductFromCart = () => removeItemFromCart(item);

    const addProductToCart = () => addItemToCart(item);

    const deleteItem = () => deleteItemFromCart(item);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>

            <BasicSpan>{name}</BasicSpan>

            <Quantity>
                <Arrow onClick={(quantity === 1) ? deleteItem : removeProductFromCart}> &#10094; </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addProductToCart}> &#10095; </Arrow>
            </Quantity>

            <BasicSpan>€{price}</BasicSpan>

            <RemoveButton onClick={deleteItem}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;