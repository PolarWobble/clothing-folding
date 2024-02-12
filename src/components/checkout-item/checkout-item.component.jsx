import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ({item}) => {

    const {name, price, imageUrl, quantity} = item;
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext);
    
    const removeProductFromCart = () => removeItemFromCart(item);

    const addProductToCart = () => addItemToCart(item);

    const deleteItem = () => deleteItemFromCart(item);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <span className='name'>{name}</span>

            <div className='quantity'>
                <div className='arrow' onClick={(quantity === 1) ? deleteItem : removeProductFromCart}> &#10094; </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addProductToCart}> &#10095; </div>
            </div>

            <span className='price'>€{price}</span>

            <span className='remove-button' onClick={deleteItem}>&#10005;</span>
        </div>
    )
}

export default CheckoutItem;