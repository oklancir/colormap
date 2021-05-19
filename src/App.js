import React, { useState, useEffect, useCallback } from 'react';

import logo from './logo.svg';
import './App.css';

import Button from './components/UI/Button';

function App() {
  const [color, setColor] = useState('#');
  const [error, setError] = useState('');

  const fetchColorHandler = useCallback(async () => {
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
        throw new Error('Error!');
      }

      const data = await result.json();
      if (data.colors && Array.isArray(data.colors) && data.colors.length > 0) {
        setColor(`#${data.colors[0].hex}`);
      } else {
        setError('Error!');
      }
    } catch (error) {
      setError(error);
    }
  }, []);

  useEffect(() => {
    fetchColorHandler();
  }, [fetchColorHandler]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          onClick={fetchColorHandler}
          color={color}
          text={error ? error : color}
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
