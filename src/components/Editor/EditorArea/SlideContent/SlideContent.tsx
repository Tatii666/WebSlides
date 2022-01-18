import React from 'react';
import s from './SlideContent.module.css';
import {DEFAULT_SLIDE_SIZE} from "../../../../dataModel/slideSizes";
import {pointType, slideType} from "../../../../dataModel/editorDataModel";
import {SlideElementContainer} from "./Element/SlideElement";

type propsType = {
    isEditor: boolean,
    slide: (slideType|null),
    scaleTransformValue?: number,
    width?: string,
    height?: string,
    onDndStart?: Function,
    dndDelta?: pointType,
}

function SlideContent({isEditor, slide, scaleTransformValue, width, height, onDndStart, dndDelta}: propsType) {
    const slideContentEditorClass = isEditor ? s.slideContent_editor : s.slideContent_player;
    return slide? (
        <div
            className={s.slideContent + ' ' + slideContentEditorClass}
            key={`slide-${slide.id}`}
            style={{
                'width': width || DEFAULT_SLIDE_SIZE.width,
                'height': height || DEFAULT_SLIDE_SIZE.height,
                'transform': `scale(${scaleTransformValue ?? 1})`,
            }}
            contentEditable={false}
        >
            {slide.elements.map(el => <SlideElementContainer
                isEditor={isEditor}
                slide={slide}
                key={el.id}
                element={el}
                onDndStart={onDndStart}
                dndDelta={dndDelta}
            /> )}
        </div>
    ) : null;
}


export {SlideContent};