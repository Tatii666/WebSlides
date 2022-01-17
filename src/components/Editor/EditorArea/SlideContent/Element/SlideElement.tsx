import React from 'react';
import {
    ElementType,
    elementType,
    idType,
    slideType,
    selectedElementsType,
    getSelectedElements,
} from "../../../../../dataModel/editorDataModel";
import {ImageElement} from "./ImageElement/ImageElement";
import {TextElement} from "./TextElement/TextElement";
import {FigureElement} from "./FigureElement/FigureElement";
import {getEditor} from "../../../../../editor";
import {dispatchType, stateType} from "../../../../../store/store";
import {
    emptySelection,
    getElementData,
    selectElementAC,
    setNewValueTextBlockAC,
} from "../../../../../store/presentationReducer";
import {connect} from "react-redux";
import s from "./SlideElement.module.css";

type propsType = {
    slide: slideType,
    selectedElements: selectedElementsType,
    element: elementType,
    setNewTextValue: Function,
    selectElement: Function,
}

type ownPropsType = {
    slide: slideType,
    element: elementType,
    isEditor: boolean,
}

function switchElement(el: elementType, slide: slideType, isSelected: boolean, isActive: boolean, setNewTextValue: Function, selectElement: Function) {
    switch (el.type) {
        case ElementType.IMAGE:
            return <ImageElement
                element={slide.imageBlocks[el.id]}
            />
        case ElementType.TEXT:
            return <TextElement
                element={slide.textBlocks[el.id]}
                slideId={slide.id}
                fontSettings={getEditor().fontPicker}
                isActive={true}
                setNewTextValue={setNewTextValue}
            />
        case ElementType.FIGURE:
            return <FigureElement
                element={slide.figureBlocks[el.id]}
            />
        default:
            return null
    }
}

function ResizeComponent() {
    return <>
        <div className={`${s.resizePointer} ${s.resizePointer_TopLeft}`}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_TopMiddle}`}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_TopRight}`}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_RightMiddle}`}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_BottomRight}`}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_BottomMiddle}`}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_BottomLeft}`}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_LeftMiddle}`}></div>
    </>
}

function SlideElement({slide, element: el, setNewTextValue, selectElement, selectedElements}: propsType) {
    const elementData = getElementData(el, slide)
    if(!elementData)
        return <></>;

    const isActive = !!selectedElements.length && selectedElements[selectedElements.length - 1] === el.id;
    const isSelected = selectedElements.includes(el.id);

    return <div
        className={`${s.element} ${isSelected ? s.selected: ''}`}
        style={{
            'width':elementData.width,
            'height':elementData.height,
            'top': elementData.position.y,
            'left': elementData.position.x,
        }}
        onClick={(event) => {
            selectElement(elementData.id, event.ctrlKey);
        }}
    >
        {switchElement(el, slide, isActive, isSelected, setNewTextValue, selectElement)}
        {isActive && <ResizeComponent />}
    </div>
}

const mapStateToProps = (state: stateType, ownProps: ownPropsType) => {
    const selection = ownProps.isEditor ? state.model.editor.presentation.selection : emptySelection;
    return {
        ...ownProps,
        selection: state.model.editor.presentation.selection,
        selectedElements: getSelectedElements(selection),
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