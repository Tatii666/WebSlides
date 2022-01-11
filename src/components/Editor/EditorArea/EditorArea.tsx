import React from 'react';
import s from './EditorArea.module.css';
import {SlideContent} from "./SlideContent/SlideContent";
import {getSelectedElements, PresentationType} from "../../../dataModel/editorDataModel";
import {connect} from "react-redux";
import {stateType} from "../../../store/store";

type propsType = {
    presentation: PresentationType,
}

function EditorArea({presentation}: propsType) {
    const slide = presentation.activeSlide ? presentation.slides[presentation.activeSlide] : null;

    return (
        <div className={s.editorArea}>
            <SlideContent
                isEditor={true}
                slide={slide}
                selectedElements={getSelectedElements(presentation.selection)}
            />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        presentation: state.model.editor.presentation,
    }
}

const EditorAreaContainer = connect(mapStateToProps)(EditorArea);

export {EditorAreaContainer};