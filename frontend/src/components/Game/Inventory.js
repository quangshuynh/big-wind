// frontend/src/components/Game/Inventory.js
import React from 'react';
import Jar from './Jar';
import { useSelector } from 'react-redux';

function Inventory() {
  const jars = useSelector((state) => state.game.jars);

  return (
    <div>
      <h3>Inventory</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {jars.map((jar) => (
          <Jar key={jar.id} jar={jar} />
        ))}
      </div>
    </div>
  );
}

export default Inventory;