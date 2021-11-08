import React from 'react';
import s from './PlayerButton.module.css';

type propsType = {
    onClick: () => void,
    value: string,
}

function PlayerButton({onClick, value}: propsType) {

    return (
        <button className={s.playerButton} onClick={onClick}>
            {value}
        </button>
    );
}


export {PlayerButton};