import {AnyAction} from "redux";
import {colorType, viewType} from "../dataModel/editorDataModel";

const userMaxColors = 6;
const white = {r: 255, g: 255, b: 255};
const black = {r: 0, g: 0, b: 0};
const gray = {r: 160, g: 160, b: 160};
const purple = {r: 153, g: 51, b: 255};
const blue = {r: 51, g: 51, b: 255};
const lightBlue = {r: 51, g: 255, b: 255};
const green = {r: 51, g: 255, b: 51};
const yellow = {r: 255, g: 255, b: 51};
const red = {r: 255, g: 51, b: 51};
const orange = {r: 255, g: 155, b: 33};
const pink = {r: 255, g: 89, b: 233};

const ADD_USER_COLOR = 'ADD_USER_COLOR';

const initalState: viewType = {
    colorPicker: {
        defaultColors: ['none', black, blue, purple, pink, orange, white, gray, lightBlue, red, yellow, green],
        userColors: Array(userMaxColors).fill(white),
        userMaxColors: userMaxColors,
    },
    fontPicker: {
        sizes: [5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 36, 48, 72],
        fonts: ['arial', 'times new roman', 'tahoma', 'monospace'],
    }
};

export const viewReducer = (state = initalState, action: AnyAction): viewType => {
    switch (action.type) {
        case ADD_USER_COLOR: {
            const newUserColors = [action.color,...state.colorPicker.userColors];
            newUserColors.length = userMaxColors;
            return {
                ...state,
                colorPicker: {
                    ...state.colorPicker,
                    userColors: newUserColors,
                }
            }
        }
        default:
            return state;
    }
};

export const addUserColorAC = (color: colorType) => ({type: ADD_USER_COLOR, color});

