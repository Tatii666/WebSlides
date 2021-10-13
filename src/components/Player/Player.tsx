import React from 'react';
import s from './Player.module.css';
import {SlideContent} from "./SlideContent/SlideContent";
import {PlayerPopup} from "./PlayerPopup/PlayerPopup";

function Player() {
    return (
        <div className={s.player}>
            <div className={s.slideContainer}>
                <SlideContent />
            </div>
            <PlayerPopup />
        </div>
    );
}


export {Player};