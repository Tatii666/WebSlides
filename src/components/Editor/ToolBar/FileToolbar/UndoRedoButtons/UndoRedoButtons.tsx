import s from "../FileToolbar.module.css";
import {RedoButton} from "./RedoButton/RedoButton";
import {UndoButton} from "./UndoButton/UndoButton";
import React from "react";
import {connect} from "react-redux";
import {dispatchType, stateType} from "../../../../../store/store";
import {doRedoAC, doUndoAC} from "../../../../../store/editorReducer";
import {editLogTypeGood} from "../../../../../dataModel/editorDataModel";

type propsType = {
    doRedo: Function,
    doUndo: Function,
    editLog: editLogTypeGood
}

function UndoRedoButtons({doUndo, doRedo, editLog}: propsType) {
    return (
        <div className={s.undoRedoButtons}>
            <RedoButton isDisabled={!editLog.redoStack.length} doRedo={doRedo}/>
            <UndoButton isDisabled={!editLog.undoStack.length} doUndo={doUndo}/>
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        editLog: state.model.editor.editLog
    }
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        doUndo: () => dispatch(doUndoAC()),
        doRedo: () => dispatch(doRedoAC()),
    }
}

const UndoRedoButtonsContainer = connect(mapStateToProps, mapDispatchToProps)(UndoRedoButtons);

export {UndoRedoButtonsContainer}