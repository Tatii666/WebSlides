import React from 'react';
import s from './SlideItem.module.css';
import {DEFAULT_SLIDE_SIZE} from "../../../../dataModel/slideSizes";
import {slideType} from "../../../../dataModel/editorDataModel";
import {dispatch} from "../../../../editor";
import {selectSlide} from "../../../../functions";

type propsType = {
    index: number,
    slide: slideType,
    isSelected: boolean,
}

function onClick(id: string, isCtrlPressed: boolean) {
    dispatch(selectSlide, {slideId: id, isCtrlPressed})
}

function SlideItem({index, slide, isSelected}: propsType) {
    const slideMiniatureWidth = 370;
    const slideMiniatureStyle = {
        width: `${slideMiniatureWidth}px`,
        height: `${slideMiniatureWidth * DEFAULT_SLIDE_SIZE.height / DEFAULT_SLIDE_SIZE.width}px`,
    }
    const selectedClass = isSelected? ` ${s.slideItem_selected}` : '';

    console.log(isSelected)
    return (
        <div className={s.slideItem + selectedClass} onClick={(event) => {
            onClick(slide.id, event.ctrlKey);
        }} >
            <div>
                {index + 1}
            </div>
            <div className={s.slideMiniature} style={slideMiniatureStyle}>
                {slide.id}
            </div>
        </div>
    );
}


export {SlideItem};