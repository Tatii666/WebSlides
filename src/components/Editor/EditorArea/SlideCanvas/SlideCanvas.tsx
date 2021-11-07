import React from 'react';
import s from './SlideCanvas.module.css';
import {DEFAULT_SLIDE_SIZE} from "../../../../dataModel/slideSizes";
import {slideType} from "../../../../dataModel/editorDataModel";

type propsType = {
    slide: (slideType|null),
}

function SlideCanvas({slide}: propsType) {
    return slide? (
        <div className={s.slideCanvas} style={{
            'width': DEFAULT_SLIDE_SIZE.width,
            'height': DEFAULT_SLIDE_SIZE.height,
        }}>
            {slide.id}
        </div>
    ) : null;
}


export {SlideCanvas};