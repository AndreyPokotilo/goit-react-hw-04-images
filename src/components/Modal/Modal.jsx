import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };

  render() {
    return createPortal(
      <div className={css.backdrop} onClick={this.onClickBackdrop}>
        <div className={css.modal}>
          <img src={this.props.largeImg} alt="#" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};