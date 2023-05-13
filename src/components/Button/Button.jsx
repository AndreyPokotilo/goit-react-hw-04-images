import PropTypes from 'prop-types';
import css from "./Button.module.css"

export function Button({onIncrement}) {
  return (
    <button type="button" className={css.button} onClick={()=>{onIncrement()}}>
      <span className="button-label">Add more</span>
    </button>
  );
}

Button.prototype = {
  onNextFetch: PropTypes.func.isRequired,
};