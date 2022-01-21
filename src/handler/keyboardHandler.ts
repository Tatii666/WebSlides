import {dispatchType, stateType} from "../store/store";
import {KeyboardEvent} from 'react';
import {
    setEditorModeAC,
    setViewModeAC,
} from "../store/modeReducer";
import {
    addNewSlideAC,
    createNewPresentationAC,
    deleteSelectedAC,
    savePresentationAC,
    setEmptySelectionAC,
    setNextSlideActiveAC,
    setPrevSlideActiveAC,
} from "../store/presentationReducer";
import {doRedoAC, doUndoAC} from "../store/editorReducer";

export const keyboardHandler = (event: KeyboardEvent<HTMLDivElement>, dispatch: dispatchType, state: stateType) => {
    switch (event.code) {
        case "Escape":
            if(state.model.mode === 'view'){
                dispatch(setEditorModeAC());
            }
            if(state.model.mode === 'edit'){
                dispatch(setEmptySelectionAC());
            }
            break;
        case "Delete":
            if(state.model.mode === 'edit'){
                dispatch(deleteSelectedAC());
            }
            break;
        case "Backspace":
            if(state.model.mode === 'edit'){
                dispatch(deleteSelectedAC());
            }
            break;
        case "ArrowRight":
            if(state.model.mode === 'view'){
                dispatch(setNextSlideActiveAC());
            }
            break;
        case  "ArrowLeft":
            if(state.model.mode === 'view'){
                dispatch(setPrevSlideActiveAC());
            }
            break;
        case "Space":
            if(state.model.mode === 'view'){
                dispatch(setNextSlideActiveAC());
            }
            if(event.ctrlKey === true && state.model.mode === 'edit'){
                dispatch(addNewSlideAC());
            }
            break;
        case "KeyZ":
            if(event.ctrlKey === true && state.model.mode === 'edit'){
                dispatch(doUndoAC());
            }
            break;
        case "KeyY":
            if(event.ctrlKey === true && state.model.mode === 'edit'){
                dispatch(doRedoAC());
            }
            break;
        case "F1":
            event.preventDefault();
            if(state.model.mode === 'edit') {
                dispatch(createNewPresentationAC());
            }
            break;
        case "F3":
            event.preventDefault();
            if(state.model.mode === 'edit' && state.model.editor.presentation.slidesOrder.length > 0){
                dispatch(savePresentationAC());
            }
            break;
        case "F5":
            if(state.model.mode === 'edit' && state.model.editor.presentation.slidesOrder.length > 0 && !event.ctrlKey){
                event.preventDefault();
                dispatch(setViewModeAC());
            } else if(state.model.mode === 'view') {
                event.preventDefault();
                dispatch(setEditorModeAC());
            }
            break;

        default:
            break;
    }
}