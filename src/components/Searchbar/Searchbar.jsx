import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { useState } from 'react';

export function Searchbar({onSubmit}) {
  const [value, setValue] = useState();

 const handleChange = (e) => {
    setValue(e.target.value)
  }

const onSubmitForm = (e) => {
    e.preventDefault()
    if(value.trim() === '') {
      alert('Insert correct request')
      return
    }
    onSubmit(value);
    setValue('');
  }

    return (
      <header className={css.header} onSubmit={onSubmitForm}>
        <form className={css.form}>
          <button type="submit" className={css.button}>
            <span className="button-label">Search</span>
          </button>

          <input
            className={css.input}
            type="text"
            onChange={handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};