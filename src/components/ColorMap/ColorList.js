import React, { useEffect, useRef } from 'react';

import ColorListItem from './ColorListItem';

import './ColorList.css';

const ColorList = ({ colors, currentColor, onClick }) => {
  const bottomRef = useRef();

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [colors]);

  return (
    <div className="colors">
      <ul>
        {colors.map((color) => (
          <ColorListItem
            key={color.id}
            color={color.color}
            currentColor={currentColor}
            onClick={onClick}
          />
        ))}
      </ul>
      <div ref={bottomRef} className="list-bottom"></div>
    </div>
  );
};

export default ColorList;
