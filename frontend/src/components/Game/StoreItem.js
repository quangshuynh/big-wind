// frontend/src/components/Game/StoreItem.js

import React from 'react';

function StoreItem({ name, price, onBuy, isBuyable }) {
  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <h4>{name}</h4>
      <p>Price: {price} Pffts</p>
      <button onClick={onBuy} disabled={!isBuyable}>
        Buy
      </button>
      {!isBuyable && <p style={{color: 'red'}}>Not enough Pffts!</p>}
    </div>
  );
}

export default StoreItem;