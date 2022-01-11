import {Action} from "redux";
import {editorModeType} from "../dataModel/editorDataModel";

const SET_EDITOR_MODE = 'SET_EDITOR_MODE';
const SET_PREVIEW_MODE = 'SET_PREVIEW_MODE';

const initalState: editorModeType = 'edit';

export const modeReducer = (state = initalState, action: Action): editorModeType => {
    switch (action.type) {
        case SET_PREVIEW_MODE:
            return 'view';
        case SET_EDITOR_MODE:
            return 'edit';
        default:
            return state;
    }
};

export const setViewModeAC = () => ({type: SET_PREVIEW_MODE});
export const setEditorModeAC = () => ({type: SET_EDITOR_MODE});
