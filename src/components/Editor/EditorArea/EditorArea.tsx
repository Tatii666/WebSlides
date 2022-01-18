import React from 'react';
import s from './EditorArea.module.css';
import {SlideContent} from "./SlideContent/SlideContent";
import {pointType, PresentationType} from "../../../dataModel/editorDataModel";
import {connect} from "react-redux";
import {dispatchType, stateType} from "../../../store/store";
import {useDownUp} from "../../../customHooks/useDownUp";
import {moveSelectedElementsAC} from "../../../store/presentationReducer";

type propsType = {
    presentation: PresentationType,
    moveSelectedElements: Function,
}

function EditorArea({presentation, moveSelectedElements}: propsType) {
    const {delta, handleMouseDown, handleMouseUp, handleMouseMove} = useDownUp(moveSelectedElements);
    const slide = presentation.activeSlide ? presentation.slides[presentation.activeSlide] : null;

    return (
        <div className={s.editorArea}
             onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseUp}
             onMouseUp={handleMouseUp}
        >
            <SlideContent
                isEditor={true}
                slide={slide}
                onDndStart={handleMouseDown}
                dndDelta={delta}
            />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        presentation: state.model.editor.presentation,
    }
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        moveSelectedElements: (delta: pointType) => dispatch(moveSelectedElementsAC(delta)),
    }
}

const EditorAreaContainer = connect(mapStateToProps, mapDispatchToProps)(EditorArea);

export {EditorAreaContainer};