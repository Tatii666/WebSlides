import React from 'react';
import s from './SlideCanvas.module.css';
import {DEFAULT_SLIDE_SIZE} from "../../../../dataModel/slideSizes";

function SlideCanvas() {
    return (
        <div className={s.slideCanvas} style={{
            'width': DEFAULT_SLIDE_SIZE.width,
            'height': DEFAULT_SLIDE_SIZE.height,
        }}>
        </div>
    );
}


export {SlideCanvas};