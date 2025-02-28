// frontend/src/components/Game/Game.js
import React, { useEffect } from 'react';
import FartButton from './FartButton';
import Inventory from './Inventory';
import Store from './Store';
import UpgradePanel from './UpgradePanel';
import { useDispatch, useSelector } from 'react-redux';
import { setPffts, fillJar, addJar,mbuyUpgrade } from '../../store/gameSlice'; //import all actions
import { loadUserData, saveUserData } from '../../services/api';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Game() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pffts, jars, upgrades } = useSelector((state) => state.game);
  const username = useSelector((state) => state.auth.username)
  const token = useSelector((state) => state.auth.token)

  // Load user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadUserData(token);
        dispatch(setPffts(data.pffts));
        //make sure to parse the data
        const parsedJars = data.jars.map((jar) => ({
            ...jar,
            filled: Number(jar.filled) || 0, // Ensure filled is a number
            capacity: Number(jar.capacity) || 10, // Ensure capacity is a number
          }));
        dispatch(addJar(parsedJars)); //add all jars
        dispatch(buyUpgrade({upgradeName: 'spicierDiet', level: data.upgrades.spicierDiet-1}))
        dispatch(buyUpgrade({upgradeName: 'improvedDigestion', level: data.upgrades.improvedDigestion-1}))
        dispatch(buyUpgrade({upgradeName: 'buttMuscleTraining', level: data.upgrades.buttMuscleTraining-1}))
      } catch (error) {
        // Handle unauthorized access (e.g., token expired)
        if (error.response && error.response.status === 403) {
          dispatch(logout());
          navigate('/login');
        }
        console.error('Error loading user data:', error);
      }
    };

    fetchData();
  }, [dispatch, token, navigate]);

  //passive farts effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Find the first available jar
      const availableJar = jars.find((jar) => jar.filled < jar.capacity);

      // If there's an available jar, fill it based on improvedDigestion upgrade level
      if (availableJar) {
        const fillAmount = upgrades.improvedDigestion * 0.1; // Example: 0.1 Pffts per second per level
        dispatch(fillJar({ jarId: availableJar.id, amount: fillAmount }));
      }
    }, 1000);  // Run every 1 second

    return () => clearInterval(intervalId);
  }, [dispatch, jars, upgrades.improvedDigestion]);


  // Save data
  const handleSave = async () => {
    try {
        const data = {pffts, jars, upgrades}
        await saveUserData(data, token);
        alert('Game saved!'); //basic for now

    }catch(error){
        console.error('Error saving data', error)
    }
  }
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <div>
      <h2>Fart Factory Tycoon</h2>
      <p>Welcome, {username}!</p>
      <p>Pffts: {pffts.toFixed(1)}</p> {/* Display Pffts */}
      <FartButton />
      <Inventory />
      <Store />
      <UpgradePanel/>
      <button onClick={handleSave}>Save Game</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Game;