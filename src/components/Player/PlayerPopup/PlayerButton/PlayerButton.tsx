import React from 'react';
import s from './PlayerButton.module.css';

type propsType = {
    onClick: () => void,
    value: string,
    isActive?: (boolean|undefined),
}

function PlayerButton({onClick, value, isActive}: propsType) {

    return (
        <button className={`${s.playerButton} ${isActive? s.playerButton_active: ''}`} onClick={onClick}>
            {value}
        </button>
    );
}


export {PlayerButton};