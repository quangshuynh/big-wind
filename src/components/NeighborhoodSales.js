import React from 'react';
import '../static/NeighborhoodSales.css';

const neighbors = [
  { name: "Mr. Poop", request: "unique air freshener" },
  { name: "Ms. Petunia", request: "vintage jar of mystery" },
  { name: "Kai Fan", request: "a jar that smells... interesting" },
];

const NeighborhoodSales = ({ onSale }) => {
  const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
  return (
    <div className="neighborhood-sales">
      <h2>Neighbor Request</h2>
      <p>{randomNeighbor.name} needs a {randomNeighbor.request}.</p>
      <button onClick={onSale}>Sell Jar</button>
      <button onClick={() => alert("Maybe next time!")}>Decline</button>
    </div>
  );
};

export default NeighborhoodSales;
