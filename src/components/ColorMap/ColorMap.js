import React, { useState, useCallback } from 'react';

import Button from '../UI/Button';
import ScrollView from '../UI/ScrollView';
import ColorList from './ColorList';

const errorMessage = 'Error!';

const ColorMap = () => {
  const [color, setColor] = useState('#ffffff');
  const [error, setError] = useState('');
  const [colorList, setColorList] = useState([]);

  const isValidHex = (hexValue) => {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hexValue);
  };

  const fetchColorHandler = useCallback(async () => {
    setError('');
    try {
      const result = await fetch('https://www.colr.org/json/color/random', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store',
        headers: {
          'Content-Type': 'text/plain',
        },
      });

      if (!result.ok) {
        throw new Error(errorMessage);
      }

      const data = await result.json();

      if (data.colors && Array.isArray(data.colors) && data.colors.length > 0) {
        const newColor = `#${data.colors[0].hex}`;

        if (!isValidHex(newColor)) {
          setError(errorMessage);
          return;
        }

        setColor(newColor);

        if (!colorList.includes(newColor))
          setColorList([...colorList, { id: Math.random(), color: newColor }]);
      } else {
        setError(errorMessage);
      }
    } catch (error) {
      setError(error);
    }
  }, [colorList]);

  return (
    <React.Fragment>
      <ScrollView>
        <ColorList colors={colorList} />
      </ScrollView>
      <Button
        onClick={fetchColorHandler}
        color={color}
        text={error ? error : color}
      />
    </React.Fragment>
  );
};

export default ColorMap;
