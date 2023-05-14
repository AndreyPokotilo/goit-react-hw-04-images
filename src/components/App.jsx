import { useState, useEffect } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImg } from 'services/imageApi';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [largeImg, setLargeImg] = useState('');
  const [totalImg, setTotalImg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoader(true);
    async function fetchData() {
      try {
        const imgArray = await fetchImg(query, page);
        setImages(prevImages => [...prevImages, ...imgArray.hits]);
        setTotalImg(imgArray.totalHits);
      } catch (error) {
        setErrorMessage(error.message);
      }
      finally{
        setIsLoader(false);
      }
    }
    fetchData()
  }, [query, page]);

  const onIncrement = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const setlargeImg = imgUrl => {
    setLargeImg(imgUrl);
  };

  const toggleModal = () => {
    setShowModal(prevModal => !prevModal);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        hits={images}
        toggleModal={toggleModal}
        setlargeImg={setlargeImg}
      />
      {isLoader && <Loader />}
      {images.length > 0 && images.length < totalImg && (
        <Button onIncrement={onIncrement} />
      )}
      {showModal ? (
        <Modal largeImg={largeImg} toggleModal={toggleModal} />
      ) : (
        <p>{errorMessage}</p>
      )}
    </div>
  );
}
