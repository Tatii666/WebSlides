import React from 'react';
import s from './SlideContent.module.css';
import {DEFAULT_SLIDE_SIZE} from "../../../../dataModel/slideSizes";
import {selectedElementsType, slideType} from "../../../../dataModel/editorDataModel";
import {SlideElement} from "./Element/SlideElement";

type propsType = {
    isEditor: boolean,
    slide: (slideType|null),
    selectedElements: selectedElementsType,
    scaleTransformValue?: number,
    readonly?: boolean,
    width?: string,
    height?: string,
}

function SlideContent({isEditor, slide, selectedElements, scaleTransformValue, readonly, width, height}: propsType) {
    const slideContentEditorClass = isEditor ? s.slideContent_editor : '';
    return slide? (
        <div className={s.slideContent + ' ' + slideContentEditorClass} style={{
            'width': width || DEFAULT_SLIDE_SIZE.width,
            'height': height || DEFAULT_SLIDE_SIZE.height,
            'transform': `scale(${scaleTransformValue ?? 1})`,
        }}>
            {slide.elements.map(el => <SlideElement {...{slide, selectedElements}} element={el}/> )}
        </div>
    ) : null;
}


export {SlideContent};