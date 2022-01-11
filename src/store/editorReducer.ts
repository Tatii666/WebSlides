import {Action, Reducer} from "redux";
import {presentationReducer} from "./presentationReducer";
import {PresentationType} from "../dataModel/editorDataModel";

const UNDO = 'UNDO';
const REDO = 'REDO';

const isStateChanged = (presentation: PresentationType, newPresentation: PresentationType): boolean => {
    if (presentation !== newPresentation) {
        if (presentation.title !== newPresentation.title
            || presentation.slides !== newPresentation.slides
            || presentation.slidesOrder !== newPresentation.slidesOrder
        ) {
            return true;
        }
    }
    return false;
}

const undoableReducer = (presentationReducer: Reducer<PresentationType>) => {
    // Call the reducer with empty action to populate the initial state

    const undoStack: Array<PresentationType> = [];
    const redoStack: Array<PresentationType> = [];

    const initialState = {
        editLog: {
            undoStack,
            redoStack,
        },
        presentation: presentationReducer(undefined, {type: ''})
    }

    // Return a reducer that handles undo and redo
    return function (state = initialState, action: Action) {
        const { presentation, editLog } = state
        switch (action.type) {
            case UNDO: {
                const undoStack = [...editLog.undoStack]
                const redoStack = [...editLog.redoStack]

                let newPresentation = undoStack.pop()
                if (newPresentation) {
                    redoStack.push(presentation)
                    return {
                        presentation: newPresentation,
                        editLog: {
                            undoStack,
                            redoStack,
                        }
                    }
                }
                return state;
            }
            case REDO: {
                const undoStack = [...editLog.undoStack]
                const redoStack = [...editLog.redoStack]
                let newPresentation = redoStack.pop()
                if (newPresentation) {
                    undoStack.push(presentation)
                    return {
                        editLog: {
                            undoStack,
                            redoStack,
                        },
                        presentation: newPresentation
                    }
                }
                return state
            }
            default: {
                // Delegate handling the action to the passed reducer
                const undoStack = [...editLog.undoStack]
                const newPresentation = presentationReducer(presentation, action)

                if (!isStateChanged(presentation, newPresentation)) {
                    return {
                        ...state,
                        presentation: newPresentation,
                    }
                }

                return {
                    presentation: newPresentation,
                    editLog: {
                        undoStack: [...undoStack, presentation],
                        redoStack: [],
                    },
                }
            }
        }
    }
}

export const editorReducer = undoableReducer(presentationReducer)

export const doUndoAC = () => ({type: UNDO});
export const doRedoAC = () => ({type: REDO});