import {CartItemContainer, ItemDetail, NameContainer} from './cart-item.styles.jsx';

const CartItem = ({cartItem}) => {
    const {name, quantity, price, imageUrl} = cartItem;

    return(
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetail>
                <NameContainer>{name}</NameContainer>
                <NameContainer>{quantity} x €{price}</NameContainer>
            </ItemDetail>
        </CartItemContainer>
    )
}

export default CartItem;