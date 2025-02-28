// frontend/src/components/Game/Jar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { sellJar } from '../../store/gameSlice';

function Jar({ jar }) {
  const dispatch = useDispatch();

  const handleSell = () => {
    dispatch(sellJar(jar.id));
  };

  const fillPercentage = (jar.filled / jar.capacity) * 100;

  return (
    <div style={{ width: '100px', margin: '10px', textAlign: 'center' }}>
      <div
        style={{
          width: '50px',
          height: '100px',
          border: '1px solid black',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: `${fillPercentage}%`,
            backgroundColor: 'brown', // Fart color!
            position: 'absolute',
            bottom: 0,
          }}
        ></div>
      </div>
      <p>
        {jar.filled} / {jar.capacity}
      </p>
      {jar.filled === jar.capacity && (
        <button onClick={handleSell}>Sell</button>
      )}
    </div>
  );
}

export default Jar;