// store/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pffts: 0,
  jars: [{ id: 'jar1', type: 'mason', filled: 0, capacity: 10 }],
  upgrades: {
        spicierDiet: 0,
        improvedDigestion: 0,
        buttMuscleTraining: 0,
  },
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPffts: (state, action) => {
            state.pffts = action.payload;
        },
        addJar: (state, action) => {
            state.jars.push(action.payload);
        },
        fillJar: (state, action) => {
            const { jarId, amount } = action.payload;
            const jar = state.jars.find((j) => j.id === jarId);
            if (jar) {
                jar.filled = Math.min(jar.capacity, jar.filled + amount);
            }
        },
        sellJar: (state, action) => {
            const jarId = action.payload;
            const jarIndex = state.jars.findIndex((j) => j.id === jarId);
            if (jarIndex !== -1 && state.jars[jarIndex].filled === state.jars[jarIndex].capacity) {
                state.pffts += 10; // Fixed sell price for MVP
                state.jars.splice(jarIndex, 1); // Remove the jar
            }
        },
        buyJar: (state) => {
          if(state.pffts >= 20){
            state.pffts -= 20; //fixed price for now
            const newId =  `jar${state.jars.length+1}`;
            state.jars.push({ id: newId, type: 'mason', filled: 0, capacity: 10 });
          }
        },
        buyUpgrade: (state, action) => {
            const {upgradeName, level} = action.payload;
            let cost = 0;
            switch (upgradeName) {
                case 'spicierDiet':
                    cost = (level + 1) * 5;
                    break;
                case 'improvedDigestion':
                    cost = (level + 1) * 15;
                    break;
                case 'buttMuscleTraining':
                    cost = (level + 1) * 10
                    break;
                default:
                    break;
            }
            if(state.pffts >= cost){
                state.pffts -= cost;
                state.upgrades[upgradeName] = level + 1;
            }
        }
    }
});

export const { setPffts, addJar, fillJar, sellJar, buyJar, buyUpgrade } = gameSlice.actions;
export default gameSlice.reducer;