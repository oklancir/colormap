import React, { useState, useCallback, useEffect } from 'react';
import { useKeyPress } from 'react-use';

import Button from '../UI/Button';
import ScrollView from '../UI/ScrollView';
import ColorList from './ColorList';

const errorMessage = 'Error!';
const isValidHex = (hexValue) => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hexValue);
};

const ColorMap = () => {
  const [color, setColor] = useState('#ffffff');
  const [error, setError] = useState('');
  const [colorList, setColorList] = useState([]);
  const [keyPressUp] = useKeyPress((event) => event.keyCode === 38);
  const [keyPressDown] = useKeyPress((event) => event.keyCode === 40);

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

      if (
        !data.colors ||
        !Array.isArray(data.colors) ||
        data.colors.length === 0
      ) {
        throw new Error(errorMessage);
      }

      const newColor = `#${data.colors[0].hex}`;
      if (!isValidHex(newColor)) {
        throw new Error(errorMessage);
      }

      setColor(newColor);

      if (!colorList.includes(newColor)) {
        setColorList([...colorList, newColor]);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [colorList]);

  useEffect(() => {
    if (keyPressDown === true) {
      moveColorItemDown();
    } else if (keyPressUp) {
      moveColorItemUp();
    }
  }, [keyPressUp, keyPressDown]);

  const setCurrentColorHandler = (color) => {
    setColor(color);
  };

  const moveColorItemUp = () => {
    const currentColorIndex = colorList.indexOf(color);
    if (currentColorIndex <= 0) {
      return;
    }
    const tempColors = [
      ...colorList.slice(0, currentColorIndex),
      ...colorList.slice(currentColorIndex + 1),
    ];
    setColorList([
      ...tempColors.slice(0, currentColorIndex - 1),
      color,
      ...tempColors.slice(currentColorIndex - 1),
    ]);
  };

  const moveColorItemDown = () => {
    const currentColorIndex = colorList.indexOf(color);
    if (currentColorIndex < 0 || currentColorIndex === colorList.length - 1) {
      return;
    }
    const tempColors = [
      ...colorList.slice(0, currentColorIndex),
      ...colorList.slice(currentColorIndex + 1),
    ];
    setColorList([
      ...tempColors.slice(0, currentColorIndex + 1),
      color,
      ...tempColors.slice(currentColorIndex + 1),
    ]);
  };

  return (
    <React.Fragment>
      <ScrollView>
        <ColorList
          colors={colorList}
          currentColor={color}
          onClick={setCurrentColorHandler}
        />
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
