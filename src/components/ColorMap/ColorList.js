import React from 'react';

import ColorListItem from './ColorListItem';

import './ColorList.css';

const ColorList = ({ colors, currentColor, onClick }) => {
  return (
    <div className="colors">
      <ul>
        {colors.map((color) => (
          <ColorListItem
            key={color}
            color={color}
            currentColor={currentColor}
            onClick={onClick}
          />
        ))}
      </ul>
    </div>
  );
};

export default ColorList;
