import React from 'react';

import './Button.css';

const Button = ({ color, text, onClick }) => {
  return (
    <button
      className="button"
      type="button"
      onClick={onClick}
      style={{ color: color }}
    >
      {text}
    </button>
  );
};

export default Button;
