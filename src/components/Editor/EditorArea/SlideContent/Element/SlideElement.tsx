import React from 'react';
import {
    ElementType,
    elementType,
    idType,
    selectedElementsType,
    slideType
} from "../../../../../dataModel/editorDataModel";
import {ImageElement} from "./ImageElement/ImageElement";
import {TextElement} from "./TextElement/TextElement";
import {FigureElement} from "./FigureElement/FigureElement";
import {getEditor} from "../../../../../editor";
import {dispatchType, stateType} from "../../../../../store/store";
import {selectElementAC, setNewValueTextBlockAC} from "../../../../../store/presentationReducer";
import {connect} from "react-redux";

type propsType = {
    slide: slideType,
    selectedElements: selectedElementsType,
    element: elementType,
    setNewTextValue: Function,
    selectElement: Function,
}

type ownPropsType = {
    slide: slideType,
    selectedElements: selectedElementsType,
    element: elementType,
}

function switchElement(el: elementType, slide: slideType, isSelected: boolean, isActive: boolean, setNewTextValue: Function, selectElement: Function) {
    switch (el.type) {
        case ElementType.IMAGE:
            return <ImageElement
                element={slide.imageBlocks[el.id]}
                isSelected={isSelected}
                selectElement={selectElement}
            />
        case ElementType.TEXT:
            return <TextElement
                element={slide.textBlocks[el.id]}
                slideId={slide.id}
                fontSettings={getEditor().fontPicker}
                isActive={true}
                isSelected={isSelected}
                setNewTextValue={setNewTextValue}
                selectElement={selectElement}
            />
        case ElementType.FIGURE:
            return <FigureElement
                element={slide.figureBlocks[el.id]}
                isSelected={isSelected}
                selectElement={selectElement}
            />
        default:
            return null
    }
}

function SlideElement({slide, selectedElements, element: el, setNewTextValue, selectElement}: propsType) {
    const isActive = !!selectedElements.length && selectedElements[0] === el.id;
    const isSelected = selectedElements.includes(el.id);

    return <>
        {switchElement(el, slide, isActive, isSelected, setNewTextValue, selectElement)}
    </>
}

const mapStateToProps = (state: stateType, ownProps: ownPropsType) => {
    return {
        ...ownProps,
    }
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        setNewTextValue: (value: string, slideId: idType, elementId: idType) => dispatch(setNewValueTextBlockAC(value, slideId, elementId)),
        selectElement: (elementId: idType, isCtrlPressed: boolean) => dispatch(selectElementAC({elementId, isCtrlPressed}))
    }
}

const SlideElementContainer = connect(mapStateToProps, mapDispatchToProps)(SlideElement);

export {SlideElementContainer};