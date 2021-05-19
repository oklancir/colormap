import React from 'react';

import './Button.css';

const Button = (props) => {
  return (
    <button
      className="button"
      type="button"
      onClick={props.onClick}
      style={{ color: props.color }}
    >
      {props.text}
    </button>
  );
};

export default Button;
