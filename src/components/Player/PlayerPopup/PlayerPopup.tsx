import React from 'react';
import s from './PlayerPopup.module.css';
import {PlayerButton} from "./PlayerButton/PlayerButton";
import {CloseButton} from "./CloseButton/CloseButton";
import {dispatch} from "../../../editor";
import {selectNextSlide} from "../../../functions";

function onNextSlideClick() {
    dispatch(selectNextSlide, {})
}

function PlayerPopup() {
    return (
        <div className={s.playerPopup}>
            <PlayerButton value={'prev'} onClick={() => {}}/>
            <PlayerButton value={'pointer'} onClick={() => {}}/>
            <PlayerButton value={'next'} onClick={onNextSlideClick}/>
            <CloseButton />
        </div>
    );
}


export {PlayerPopup};