// frontend/src/components/Game/FartButton.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPffts, fillJar } from '../../store/gameSlice';
import { Howl } from 'howler'; //sound library
// Import your fart sound (place it in the public folder)
// Example: public/sounds/fart.mp3
const fartSound = new Howl({
  src: ['/sounds/fart.mp3'], // Path relative to the public folder
});

function FartButton() {
  const dispatch = useDispatch();
  const {jars, upgrades, pffts} = useSelector((state) => state.game);

  const handleClick = () => {
    // Play fart sound
    fartSound.play();
    const pfftsToAdd = 1 + upgrades.spicierDiet + upgrades.buttMuscleTraining;
    // Update Pffts
    dispatch(setPffts(pffts + pfftsToAdd));

    // Attempt to fill a jar (find the first non-full jar)
    const availableJar = jars.find((jar) => jar.filled < jar.capacity);
    if (availableJar) {
      dispatch(fillJar({ jarId: availableJar.id, amount: 1 }));
    }
  };

  return (
    <button onClick={handleClick} style={{ fontSize: '2em' }}>
      🍑💨 {/* Butt and fart emoji (or use an image) */}
    </button>
  );
}

export default FartButton;