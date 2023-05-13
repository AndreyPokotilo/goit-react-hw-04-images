import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'

export function ImageGalleryItem({
  webformatURL,
  tags,
  setlargeImg,
  toggleModal,
  largeImageURL,
}) {
  return (
    <li className={css.item}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => {
          setlargeImg(largeImageURL);
          toggleModal();
        }}
      />
    </li>
  );
}

ImageGalleryItem.prototype = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setlargeImg: PropTypes.func.isRequired,
};