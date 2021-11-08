import React from 'react';
import s from './SlideContent.module.css';
import {slideType} from "../../../dataModel/editorDataModel";

type propsType = {
    slide: slideType,
}
function SlideContent({slide}: propsType) {
    return (
        <div className={s.slideContent}>
            {slide.id}
        </div>
    );
}


export {SlideContent};