import React from 'react';
import s from './PlayerPopup.module.css';
import {PlayerButton} from "./PlayerButton/PlayerButton";
import {CloseButton} from "./CloseButton/CloseButton";


function PlayerPopup() {
    return (
        <div className={s.playerPopup}>
            <PlayerButton value={'prev'}/>
            <PlayerButton value={'pointer'}/>
            <PlayerButton value={'next'}/>
            <CloseButton />
        </div>
    );
}


export {PlayerPopup};