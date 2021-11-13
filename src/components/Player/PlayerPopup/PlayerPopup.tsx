import React from 'react';
import s from './PlayerPopup.module.css';
import {PlayerButton} from "./PlayerButton/PlayerButton";
import {CloseButton} from "./CloseButton/CloseButton";
import {dispatch} from "../../../editor";
import {selectNextSlide, selectPrevSlide} from "../../../functions";

type propsType = {
    pointer: {
        setStatePointer: React.Dispatch<React.SetStateAction<boolean>>,
        statePointer: boolean,
    }
}

function onNextSlideClick() {
    dispatch(selectNextSlide, {})
}

function onPrevSlideClick() {
    dispatch(selectPrevSlide, {})
}



function PlayerPopup({pointer}: propsType) {
    return (
        <div className={s.playerPopup}>
            <PlayerButton value={'prev'} onClick={onPrevSlideClick}/>
            <PlayerButton value={'pointer'} isActive={pointer.statePointer} onClick={() => {pointer.setStatePointer(!pointer.statePointer)}}/>
            <PlayerButton value={'next'} onClick={onNextSlideClick}/>
            <CloseButton />
        </div>
    );
}


export {PlayerPopup};