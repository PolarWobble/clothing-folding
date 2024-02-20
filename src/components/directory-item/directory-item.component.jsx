import { useNavigate } from 'react-router-dom';

import {DirectoryItemContainer, BackgroundImage, BodyContainer} from './directory-item.styles.jsx';

const DirectoryItem = ({category}) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);
    
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImage imageUrl={imageUrl} />
          <BodyContainer>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </BodyContainer>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;