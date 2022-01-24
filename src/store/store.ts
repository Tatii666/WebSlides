import {combineReducers, createStore} from "redux";
import {modelReducer} from "./modelReducer";
import {viewReducer} from "./viewReducer";

let redusers = combineReducers({
    model: modelReducer,
    view: viewReducer,
})

export const store = createStore(redusers);

export type stateType = ReturnType<typeof store.getState>;

export type dispatchType = typeof store.dispatch;
