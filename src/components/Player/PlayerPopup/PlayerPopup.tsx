import React from 'react';
import s from './PlayerPopup.module.css';
import {PlayerButton} from "./PlayerButton/PlayerButton";
import {CloseButton} from "./CloseButton/CloseButton";
import {ReactComponent as prevSlideIcon} from "../../../img/leftArrowWithoutBg.svg";
import {ReactComponent as nextSlideIcon} from "../../../img/rightArrowWithoutBg.svg";
import {ReactComponent as pointerIcon} from "../../../img/pointer.svg";
import {ReactComponent as closeButtonIcon} from "../../../img/closeButtonWithoutBg.svg";

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
        <div className={s.playerPopup}
            onClick={(e) => e.stopPropagation()}
        >
            <PlayerButton icon={prevSlideIcon} onClick={() => setPrevSlideActive()}/>
            <PlayerButton icon={pointerIcon} isActive={pointer.statePointer} onClick={() => {pointer.setStatePointer(!pointer.statePointer)}}/>
            <PlayerButton icon={nextSlideIcon} onClick={() => setNextSlideActive()}/>
            <CloseButton icon={closeButtonIcon} setEditorMode={setEditorMode}/>
        </div>
    );
}

export {PlayerPopup};