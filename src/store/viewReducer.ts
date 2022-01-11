import {Action} from "redux";

const initalState = {};

export const viewReducer = (state = initalState, action: Action): Object => {
    switch (action.type) {
        default:
            return state;
    }
};

