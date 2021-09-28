import {EditorType} from "./editorDataModel.ts";

const Editor: EditorType = {}

function undo(): void {
    if(Editor.editLog.undoStack.length) {
        let newPresentationState = Editor.editLog.undoStack.pop();
        let oldPresentationState = Editor.Presentation;

        Editor.editLog.redoStack.push(oldPresentationState);
        Editor.Presentation = newPresentationState;
    }
}

function redo(): void {
    if(Editor.editLog.redoStack.length) {
        let newPresentationState = Editor.editLog.redoStack.pop();
        let oldPresentationState = Editor.Presentation;

        Editor.editLog.undoStack.push(oldPresentationState);
        Editor.Presentation = newPresentationState;
    }
}

function cleanRedo(): void {
    if (Editor.editLog.redoStack.length) {
        Editor.editLog.redoStack = [];
    }
}