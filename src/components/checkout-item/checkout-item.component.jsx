import './checkout-item.styles.scss';

import { useContext } from 'react';

import { ProductsContext } from '../../contexts/products.context';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({item}) => {

    const {name, price, imageUrl} = item;
    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext);
    
    const removeProductFromCart = () => removeItemFromCart(item);

    const addProductToCart = () => addItemToCart(item);

    const deleteItem = () => deleteItemFromCart(item);

    return (
        <div key={item.id} className='individual-item'>
            <img src={item.imageUrl} alt={`${item.name}`} />
            <span>{item.name}</span>
            <div>
                <span onClick={(item.quantity === 1) ? deleteItem : removeProductFromCart}> {'<'} </span>
                <span>{item.quantity}</span>
                <span onClick={addProductToCart}> {'>'} </span>
            </div>
            
            <span>€{item.price}</span>
            <span onClick={deleteItem}>X</span>
        </div>
    )
}

export default CheckoutItem;