import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { buyUpgrade } from '../../store/gameSlice';

function UpgradePanel(){
    const dispatch = useDispatch();
    const upgrades = useSelector(state => state.game.upgrades);
    const pffts = useSelector(state => state.game.pffts);
    const handleBuyUpgrade = (upgradeName, level) => {
        dispatch(buyUpgrade({upgradeName, level}));
    }

    return(
        <div>
            <h3>Upgrades</h3>
            <div>
                <h4>Spicier Diet</h4>
                <p>Level: {upgrades.spicierDiet}</p>
                <p>Cost: {(upgrades.spicierDiet + 1) * 5} Pffts</p>
                <button onClick={() => handleBuyUpgrade('spicierDiet', upgrades.spicierDiet)} disabled={pffts < (upgrades.spicierDiet + 1) * 5}>Buy</button>
            </div>
            <div>
                <h4>Improved Digestion</h4>
                <p>Level: {upgrades.improvedDigestion}</p>
                <p>Cost: {(upgrades.improvedDigestion + 1) * 15} Pffts</p>
                <button onClick={() => handleBuyUpgrade('improvedDigestion', upgrades.improvedDigestion)} disabled={pffts < (upgrades.improvedDigestion + 1) * 15}>Buy</button>
            </div>
            <div>
                <h4>Butt Muscle Training</h4>
                <p>Level: {upgrades.buttMuscleTraining}</p>
                <p>Cost: {(upgrades.buttMuscleTraining + 1) * 10} Pffts</p>
                <button onClick={() => handleBuyUpgrade('buttMuscleTraining', upgrades.buttMuscleTraining)} disabled={pffts < (upgrades.buttMuscleTraining + 1) * 10}>Buy</button>
            </div>
        </div>
    )
}

export default UpgradePanel;