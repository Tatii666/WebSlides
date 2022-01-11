import React from 'react';
import s from './PresentationToolbar.module.css';
import {PreviewButton} from "./PreviewButton/PreviewButton";
import {ExportButton} from "./ExportButton/ExportButton";
import {PresentationType} from "../../../../dataModel/editorDataModel";
import {dispatchType, stateType} from "../../../../store/store";
import {connect} from "react-redux";
import {setViewModeAC} from "../../../../store/modeReducer";

type propsType = {
    presentation: PresentationType,
    setViewMode: Function,
}

function PresentationToolbar({presentation, setViewMode}: propsType) {
    return (
        <div className={s.presentationToolbar}>
            <PreviewButton isActive={!!presentation.slidesOrder.length} setViewMode={setViewMode}/>
            <ExportButton isDisabled={true}/>
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
        setViewMode: () => dispatch(setViewModeAC()),
    }
}

const PresentationToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(PresentationToolbar);

export {PresentationToolbarContainer};