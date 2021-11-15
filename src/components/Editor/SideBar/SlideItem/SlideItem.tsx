import React from 'react';
import s from './SlideItem.module.css';
import {DEFAULT_SLIDE_SIZE, MINIATURE_SLIDE_SIZE} from "../../../../dataModel/slideSizes";
import {slideType} from "../../../../dataModel/editorDataModel";
import {dispatch} from "../../../../editor";
import {selectSlide} from "../../../../functions";
import {SlideContent} from "../../EditorArea/SlideContent/SlideContent";

type propsType = {
    index: number,
    slide: slideType,
    isSelected: boolean,
    isActive: boolean,
}

function onClick(id: string, isCtrlPressed: boolean) {
    dispatch(selectSlide, {slideId: id, isCtrlPressed})
}

function SlideItem({index, slide, isSelected, isActive}: propsType) {
    const slideMiniatureStyle = {
        width: `${MINIATURE_SLIDE_SIZE.width}px`,
        height: `${MINIATURE_SLIDE_SIZE.height}px`,
    }
    const selectedClass = isSelected ? ` ${s.slideItem_selected}` : '';
    const activeClass = isActive ? ` ${s.slideItem_active}` : '';

    return (
        <div className={s.slideItem + selectedClass + activeClass} onClick={(event) => {
            onClick(slide.id, event.ctrlKey);
        }} >
            <div>
                {index + 1}
            </div>
            <div className={s.slideMiniature} style={slideMiniatureStyle}>
                <SlideContent
                    isEditor={false}
                    slide={slide}
                    selectedElements={[]}
                    scaleTransformValue={MINIATURE_SLIDE_SIZE.width/DEFAULT_SLIDE_SIZE.width}
                />
            </div>
        </div>
    );
}


export {SlideItem};