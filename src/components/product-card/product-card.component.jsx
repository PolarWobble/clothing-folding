import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';

import {ProductCardContainer, Footer, Name, Price} from './product-card.styles.jsx';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);
    
    const addProductToCart = () => addItemToCart(product);

    return(
        <ProductCardContainer>
            <>
                <img src={imageUrl} alt={`${name}`}/>
                <Button buttonType='base' onClick={addProductToCart}>Add to cart</Button>
            </>
            <Footer>
                <Name>{name}</Name>
                <Price>€{price}</Price>
            </Footer>
            
        </ProductCardContainer>
    )
}

export default ProductCard;