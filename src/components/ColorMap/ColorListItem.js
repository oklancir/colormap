import React from 'react';

const ColorListItem = (props) => {
  return (
    <li style={{ color: props.color }} onClick={props.onClick}>
      {props.color}
    </li>
  );
};

export default ColorListItem;
