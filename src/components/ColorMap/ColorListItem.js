import React, { useRef, useEffect } from 'react';

const ColorListItem = ({ color, currentColor, onClick }) => {
  const ref = useRef();

  const scrollToItem = () => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (currentColor === color) {
      scrollToItem();
    }
  }, [currentColor, color]);

  return (
    <li
      ref={ref}
      style={{
        color: color,
        fontWeight: color === currentColor ? 'bold' : 'normal',
      }}
      onClick={() => onClick(color)}
    >
      {color}
    </li>
  );
};

export default ColorListItem;
