import React from 'react';

const ColorListItem = ({ color, onClick }) => {
  return (
    <li style={{ color: color }} onClick={onClick}>
      {color}
    </li>
  );
};

export default ColorListItem;
