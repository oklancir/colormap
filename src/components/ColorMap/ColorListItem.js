import React from 'react';

const ColorListItem = ({ color, currentColor, onClick }) => {
  return (
    <li
      style={{
        color: color,
        fontWeight: color === currentColor ? 'bold' : 'normal',
      }}
      onClick={onClick}
    >
      {color}
    </li>
  );
};

export default ColorListItem;
