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
    changeSlideBackgroundImage: Function,
    onLoadImageClickRef: React.MutableRefObject<Function>,
}

function SlideButtons({slideId, moveSlide, className, isBackground, changeSlideBackgroundImage, onLoadImageClickRef}: propsType) {
    return (
        <div className={`${s.slideButtons} ${className}`}>
            <SlideButton icon={arrowUp} onClick={() => {moveSlide(slideId, 'prev')}} />
            <SlideButton
                className={s.backgroundImg}
                icon={isBackground ? delBgImage : addBgImage}
                onClick={() => !isBackground ? onLoadImageClickRef.current(slideId) : changeSlideBackgroundImage(slideId)}
            />
           <SlideButton icon={arrowDown} onClick={() => {moveSlide(slideId, 'next')}} />
        </div>
    );
}

export {SlideButtons};