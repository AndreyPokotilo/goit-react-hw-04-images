import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImg } from 'services/imageApi';

export class App extends Component {
  state = {
    query: '',
    page: null,
    images: [],
    isLoader: false,
    errorMessage: '',
    status: 'idle',
    largeImg: '',
    totalImg: null,
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    try {
      if (query !== prevState.query || page !== prevState.page) {
        this.setState({ isLoader: true });

        const imgArray = await fetchImg(query, page);
        this.setState(({ images }) => ({
          images: [...images, ...imgArray.hits],
          totalImg: imgArray.totalHits,
          isLoader: false,
        }));
      }
    } catch (error) {
      this.setState({ errorMessage: error.message, isLoader: false});
    }
  }

  onIncrement = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  handleSubmit = value => {
    this.setState({ query: value, page: 1, images: [] });
  };

  setlargeImg = imgUrl => {
    this.setState({ largeImg: imgUrl });
  };

  toggleModal = () => {
    this.setState(state => ({ showModal: !state.showModal }));
  };

  render() {
    const {
      images,
      isLoader,
      errorMessage,
      // status,
      largeImg,
      totalImg,
      showModal,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          hits={images}
          toggleModal={this.toggleModal}
          setlargeImg={this.setlargeImg}
        />
        {isLoader && <Loader />}
        {images.length > 0 && images.length < totalImg && (
          <Button onIncrement={this.onIncrement} />
        )}
        {showModal ? (
          <Modal largeImg={largeImg} toggleModal={this.toggleModal} />
        ) : (
          <p>{errorMessage}</p>
        )}
      </div>
    );
  }
}
