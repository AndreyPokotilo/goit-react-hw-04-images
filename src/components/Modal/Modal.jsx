import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImg, toggleModal }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const onClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return createPortal(
    <div className={css.backdrop} onClick={onClickBackdrop}>
      <div className={css.modal}>
        <img src={largeImg} alt="#" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
