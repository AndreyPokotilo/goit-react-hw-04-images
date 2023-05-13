import PropTypes from 'prop-types';
import css from './ImageGallery.module.css'

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export function ImageGallery({ hits, setlargeImg, toggleModal }) {
  return (
    <ul className={css.listGalery}>
      {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          toggleModal={toggleModal}
          setlargeImg={setlargeImg}
        />
      ))}
    </ul>
  );
}

ImageGallery.prototype = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  setlargeImg: PropTypes.func.isRequired, 
  toggleModal: PropTypes.func.isRequired,
};