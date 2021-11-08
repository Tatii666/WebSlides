import s from "../FileToolbar.module.css";
import {RedoButton} from "./RedoButton/RedoButton";
import {getEditor} from "../../../../../editor";
import {UndoButton} from "./UndoButton/UndoButton";
import React from "react";

function UndoReduButtons() {
    return (
        <div className={s.undoRedoButtons}>
            <RedoButton isDisabled={!getEditor().editLog.redoStack.length} />
            <UndoButton isDisabled={!getEditor().editLog.undoStack.length} />
        </div>
    );
}

export {UndoReduButtons}