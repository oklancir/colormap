import React from 'react';

import './ScrollView.css';

const ScrollView = (props) => {
  return <div className="scrollview">{props.children}</div>;
};

export default ScrollView;
