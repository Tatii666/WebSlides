import React from 'react';
import s from './SlideButtons.module.css';
import {idType} from "../../../../../dataModel/editorDataModel";
import {SlideButton} from "./SlideButton/SlideButton";
import {ReactComponent as arrowUp} from "../../../../../img/arrowUp.svg";
import {ReactComponent as arrowDown} from "../../../../../img/arrowDown.svg";

type propsType = {
    slideId: idType,
    moveSlide: Function,
    className: string,
}

function SlideButtons({slideId, moveSlide, className}: propsType) {
    return (
       <div className={`${s.slideButtons} ${className}`}>
           <SlideButton icon={arrowUp} onClick={() => {moveSlide(slideId, 'prev')}} />
           <div>img</div>
           <SlideButton icon={arrowDown} onClick={() => {moveSlide(slideId, 'next')}} />
       </div>
    );
}

export {SlideButtons};