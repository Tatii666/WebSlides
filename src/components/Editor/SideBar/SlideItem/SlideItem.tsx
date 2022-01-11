import React from 'react';
import s from './SlideItem.module.css';
import {DEFAULT_SLIDE_SIZE, MINIATURE_SLIDE_SIZE} from "../../../../dataModel/slideSizes";
import {slideType} from "../../../../dataModel/editorDataModel";
import {SlideContent} from "../../EditorArea/SlideContent/SlideContent";
import {DeleteButton} from "./DeleteButton/DeleteButton";

type propsType = {
    index: number,
    slide: slideType,
    isSelected: boolean,
    isActive: boolean,
    selectSlide: Function,
    deleteSlide: Function,
}

function SlideItem({index, slide, isSelected, isActive, selectSlide, deleteSlide}: propsType) {
    const slideMiniatureStyle = {
        width: `${MINIATURE_SLIDE_SIZE.width}px`,
        height: `${MINIATURE_SLIDE_SIZE.height}px`,
    }
    const selectedClass = isSelected ? ` ${s.slideItem_selected}` : '';
    const activeClass = isActive ? ` ${s.slideItem_active}` : '';

    return (
        <div className={s.slideItem + selectedClass + activeClass}
             onClick={(event) => {
                selectSlide({slideId: slide.id, isCtrlPressed: event.ctrlKey});
            }}
        >
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
                <DeleteButton slideId={slide.id} deleteSlide={deleteSlide}/>
            </div>
        </div>
    );
}


export {SlideItem};