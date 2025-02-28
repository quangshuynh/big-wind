import React, { useState } from 'react';
import '../static/GroceryStore.css';

const categories = {
  "Basic Bloaters": [
    { name: "Beans", price: 10, boost: 1, duration: 10, risk: 0.1, category: "Basic", stomachFill: 15 },
    { name: "Cabbage", price: 12, boost: 1, duration: 10, risk: 0.1, category: "Basic", stomachFill: 10 },
  ],
  "Dairy Disaster Zone": [
    { name: "Milk", price: 20, boost: 2, duration: 10, risk: 0.5, category: "Dairy", stomachFill: 20 },
    { name: "Cheese", price: 25, boost: 2, duration: 10, risk: 0.5, category: "Dairy", stomachFill: 18 },
  ],
  "Spicy Sensations": [
    { name: "Chili Pepper", price: 15, boost: 2, duration: 8, risk: 0.3, category: "Spicy", stomachFill: 12 },
  ],
  "Exotic Eruptions": [
    { name: "Durian", price: 40, boost: 3, duration: 12, risk: 0.4, category: "Exotic", stomachFill: 25 },
  ],
  "RIT Delights": [
    { name: "Tiger Fuel Energy Drink", price: 35, boost: 3, duration: 5, risk: 0.1, category: "RIT", stomachFill: 15 },
  ],
  "Rochester": [
    { name: "Garbage Plates", price: 50, boost: 4, duration: 10, risk: 0.2, category: "RIT", stomachFill: 30 },
  ],
  "Upgrades": [
    {
      name: "Fart Multiplier Upgrade",
      price: 50,
      currency: "farts",
      multiplierIncrease: 1,
      description: "Increase your fart multiplier by 1."
    }
  ]
};

const GroceryStore = ({ onBuyItem }) => {
  const [selectedCategory, setSelectedCategory] = useState("Basic Bloaters");

  return (
    <div className="grocery-store">
      <h2>Grocery Store</h2>
      <div className="category-tabs">
        {Object.keys(categories).map(category => (
          <button 
            key={category} 
            className={`tab-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="item-list">
        {categories[selectedCategory].map((item, index) => (
          <div key={index} className="item-card">
            <h3>{item.name}</h3>
            <p>
              Price: {item.price} {item.currency === 'farts' ? 'Farts' : 'Toots'}
            </p>
            {item.boost && <p>Boost: +{item.boost}</p>}
            {item.risk !== undefined && <p>Risk: {Math.round(item.risk * 100)}%</p>}
            {item.stomachFill && <p>Stomach Fill: {item.stomachFill}</p>}
            {item.multiplierIncrease && <p>Multiplier Increase: +{item.multiplierIncrease}</p>}
            {item.description && <p>{item.description}</p>}
            <button onClick={() => onBuyItem(item)}>Buy</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroceryStore;
