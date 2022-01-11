import {combineReducers} from "redux";
import {modeReducer} from "./modeReducer";
import {editorReducer} from "./editorReducer";

export const modelReducer = combineReducers({
    mode: modeReducer,
    editor: editorReducer,
});
