// frontend/src/components/Game/Store.js
import React from 'react';
import StoreItem from './StoreItem';
import { useDispatch, useSelector } from 'react-redux';
import {buyJar} from '../../store/gameSlice';
function Store() {
  const dispatch = useDispatch();
  const pffts = useSelector(state => state.game.pffts);
  const handleBuyJar = () =>{
    dispatch(buyJar());
  }

  return (
    <div>
      <h3>Store</h3>
      <StoreItem name="Mason Jar" price={20} onBuy={handleBuyJar} isBuyable={pffts >= 20}/>
    </div>
  );
}

export default Store;