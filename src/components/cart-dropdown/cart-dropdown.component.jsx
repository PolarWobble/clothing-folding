import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import {Outlet, Link} from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles.jsx';
import '../button/button.styles.scss';

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    return(
        <CartDropdownContainer>
            <CartItems>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </CartItems>
            <Link className='button-container' to='/checkout'>GO TO CHECKOUT</Link>
        </CartDropdownContainer>
    )
}

export default CartDropdown;