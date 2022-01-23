import React from 'react';
import s from './SlideButtons.module.css';
import {idType} from "../../../../../dataModel/editorDataModel";
import {SlideButton} from "./SlideButton/SlideButton";
import {ReactComponent as arrowUp} from "../../../../../img/arrowUp.svg";
import {ReactComponent as arrowDown} from "../../../../../img/arrowDown.svg";
import {ReactComponent as addBgImage} from "../../../../../img/addBackgrImage.svg";
import {ReactComponent as delBgImage} from "../../../../../img/deleteBackgrImg.svg";

type propsType = {
    slideId: idType,
    moveSlide: Function,
    className: string,
    isBackground: boolean,
}

function SlideButtons({slideId, moveSlide, className, isBackground}: propsType) {
    return (
       <div className={`${s.slideButtons} ${className}`}>
           <SlideButton icon={arrowUp} onClick={() => {moveSlide(slideId, 'prev')}} />
           <SlideButton className={s.backgroundImg} icon={isBackground ? delBgImage : addBgImage} onClick={() => {}} />
           <SlideButton icon={arrowDown} onClick={() => {moveSlide(slideId, 'next')}} />
       </div>
    );
}

export {SlideButtons};