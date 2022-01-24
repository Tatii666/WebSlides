import React from 'react';
import s from './ColorToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {ActiveColors} from "./ActiveColors/ActiveColors";
import {dispatchType, stateType} from "../../../../store/store";
import {connect} from "react-redux";
import {colorType, PresentationType, stylesType} from "../../../../dataModel/editorDataModel";
import {
    changeColorsSelectedAC,
    changeColorsSelectedACPropsType,
    getElementData
} from "../../../../store/presentationReducer";
import {DefaultColors} from "./DefaultColors/DefaultColors";
import {addUserColorAC} from "../../../../store/viewReducer";

type propsType = {
    presentation: PresentationType,
    changeColorsSelected: Function,
    addUserColor: Function,
    colors: Array<colorType>,
}

function getColorLastSelected({slides, selection, activeSlide}: PresentationType): {color: colorType|undefined, backgroundColor: colorType}|null {
    if(!selection.selectionItems.length) {
        return null;
    }
    if(selection.type === 'slide') {
        const currentSlide = slides[selection.selectionItems[selection.selectionItems.length - 1]];
        return {
            color: undefined,
            backgroundColor: currentSlide.styles.backgroundColor,
        }
    }
    if(selection.type === 'element' && slides[activeSlide]) {
        const currentSlide = slides[activeSlide];
        const selectedElementMeta = currentSlide.elements.find(el => el.id === selection.selectionItems[selection.selectionItems.length - 1]);
        if(selectedElementMeta) {
            const element = getElementData(selectedElementMeta, currentSlide);
            if(element) {
                return {
                    color: element.styles.color,
                    backgroundColor: element.styles.backgroundColor,
                }
            }
        }
    }
    return null
}

function ColorToolbar({presentation, changeColorsSelected, addUserColor, colors}: propsType) {
    return (
        <div className={s.colorToolbar}>
            <div className={s.colorToolbar}>
                <ActiveColors changeColors={changeColorsSelected} addUserColor={addUserColor} currentColors={getColorLastSelected(presentation)}/>
                <DefaultColors changeColors={changeColorsSelected} colors={colors}/>
            </div>
            <ToolbarText text="цвет" />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        presentation: state.model.editor.presentation,
        colors: [...state.view.colorPicker.defaultColors, ...state.view.colorPicker.userColors],
    }
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        changeColorsSelected: ({color, backgroundColor}: changeColorsSelectedACPropsType) => dispatch(changeColorsSelectedAC({color, backgroundColor})),
        addUserColor: (color: colorType) => dispatch(addUserColorAC(color)),
    }
}

const ColorToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(ColorToolbar);

export {ColorToolbarContainer};