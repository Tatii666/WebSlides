import React from 'react';
import s from './EditorArea.module.css';
import {SlideContent} from "./SlideContent/SlideContent";
import {pointType, PresentationType} from "../../../dataModel/editorDataModel";
import {connect} from "react-redux";
import {dispatchType, stateType} from "../../../store/store";
import {useDownUp} from "../../../customHooks/useDownUp";
import {useElementResize} from "../../../customHooks/useElementResize";
import {moveSelectedElementsAC, transformElementAC} from "../../../store/presentationReducer";

type propsType = {
    presentation: PresentationType,
    moveSelectedElements: Function,
    transformElement: Function,
}

function EditorArea({presentation, moveSelectedElements, transformElement}: propsType) {
    const slide = presentation.activeSlide ? presentation.slides[presentation.activeSlide] : null;
    const {
        delta,
        handleMouseDown: handleMouseDownDnd,
        handleMouseUp: handleMouseUpDnd,
        handleMouseMove: handleMouseMoveDnd,
    } = useDownUp(moveSelectedElements);
    const {
        resizeDelta,
        handleMouseDownResize,
        handleMouseUpResize,
        handleMouseMoveResize,
    } = useElementResize(transformElement)


    return (
        <div className={s.editorArea}
             onMouseMove={(e) => {
                 handleMouseMoveDnd(e);
                 handleMouseMoveResize(e);
             }}
             onMouseLeave={(e) => {
                 handleMouseUpDnd(e);
                 handleMouseUpResize(e);
             }}
             onMouseUp={(e) => {
                 handleMouseUpDnd(e);
                 handleMouseUpResize(e);
             }}
        >
            <SlideContent
                isEditor={true}
                slide={slide}
                onDndStart={handleMouseDownDnd}
                dndDelta={delta}
                onResizeStart={handleMouseDownResize}
                resizeDelta={resizeDelta}
            />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        presentation: state.model.editor.presentation,
    }
}

export type transformElementProps = {
    x: number,
    y: number,
    width: number,
    height: number,
}
const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        moveSelectedElements: (delta: pointType) => dispatch(moveSelectedElementsAC(delta)),
        transformElement: (delta: transformElementProps) => dispatch(transformElementAC({delta})),
    }
}

const EditorAreaContainer = connect(mapStateToProps, mapDispatchToProps)(EditorArea);

export {EditorAreaContainer};
