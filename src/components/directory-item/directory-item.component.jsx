import {DirectoryItemContainer, BackgroundImage, BodyContainer} from './directory-item.styles.jsx';

const DirectoryItem = ({category}) => {
    const { imageUrl, title } = category;
    
    return (
        <DirectoryItemContainer>
          <BackgroundImage style={{
            backgroundImage: `url(${imageUrl})`
          }} />
          <BodyContainer>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </BodyContainer>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;