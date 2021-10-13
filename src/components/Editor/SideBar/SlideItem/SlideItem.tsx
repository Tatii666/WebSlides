import React from 'react';
import s from './SlideItem.module.css';
import {DEFAULT_SLIDE_SIZE} from "../../../../dataModel/slideSizes";

function SlideItem({index, slide}: any) {
    const slideMiniatureWidth = 370;
    const slideMiniatureStyle = {
        width: `${slideMiniatureWidth}px`,
        height: `${slideMiniatureWidth * DEFAULT_SLIDE_SIZE.height / DEFAULT_SLIDE_SIZE.width}px`,
    }

    return (
        <div className={s.slideItem} >
            <div>
                {index + 1}
            </div>
            <div className={s.slideMiniature} style={slideMiniatureStyle}>
                {slide}
            </div>
        </div>
    );
}


export {SlideItem};