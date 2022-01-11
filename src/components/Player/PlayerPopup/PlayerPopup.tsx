import React from 'react';
import s from './PlayerPopup.module.css';
import {PlayerButton} from "./PlayerButton/PlayerButton";
import {CloseButton} from "./CloseButton/CloseButton";

type propsType = {
    pointer: {
        setStatePointer: React.Dispatch<React.SetStateAction<boolean>>,
        statePointer: boolean,
    }
    setNextSlideActive: Function,
    setPrevSlideActive: Function,
    setEditorMode: Function,
}

function PlayerPopup({pointer, setNextSlideActive, setPrevSlideActive, setEditorMode}: propsType) {
    return (
        <div className={s.playerPopup}>
            <PlayerButton value={'prev'} onClick={() => setPrevSlideActive()}/>
            <PlayerButton value={'pointer'} isActive={pointer.statePointer} onClick={() => {pointer.setStatePointer(!pointer.statePointer)}}/>
            <PlayerButton value={'next'} onClick={() => setNextSlideActive()}/>
            <CloseButton setEditorMode={setEditorMode}/>
        </div>
    );
}


export {PlayerPopup};