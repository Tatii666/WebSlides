import React from 'react';
import {
    ElementType,
    elementType,
    idType,
    slideType,
    selectedElementsType,
    getSelectedElements,
    pointType,
} from "../../../../../dataModel/editorDataModel";
import {ImageElement} from "./ImageElement/ImageElement";
import {TextElement} from "./TextElement/TextElement";
import {FigureElement} from "./FigureElement/FigureElement";
import {ResizeComponent} from "./ResizeComponent/ResizeComponent";
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
import {resizeDeltaType} from "../../../../../customHooks/useElementResize";

type propsType = {
    slide: slideType,
    selectedElements: selectedElementsType,
    element: elementType,
    setNewTextValue: Function,
    selectElement: Function,
    onDndStart?: Function,
    dndDelta?: pointType,
    onResizeStart?: Function,
    resizeDelta?: resizeDeltaType,
}

type ownPropsType = {
    slide: slideType,
    element: elementType,
    isEditor: boolean,
    onDndStart?: Function,
    dndDelta?: pointType,
    onResizeStart?: Function,
    resizeDelta?: resizeDeltaType,
}

function switchElement(el: elementType, slide: slideType, isSelected: boolean, isActive: boolean, setNewTextValue: Function, deltaWidth?: number, deltaHeight?: number) {
    switch (el.type) {
        case ElementType.IMAGE:
            return <ImageElement
                element={slide.imageBlocks[el.id]}
                deltaWidth={deltaWidth}
                deltaHeight={deltaHeight}
            />
        case ElementType.TEXT:
            return <TextElement
                element={slide.textBlocks[el.id]}
                slideId={slide.id}
                fontSettings={getEditor().fontPicker}
                isActive={true}
                setNewTextValue={setNewTextValue}
                deltaWidth={deltaWidth}
                deltaHeight={deltaHeight}
            />
        case ElementType.FIGURE:
            return <FigureElement
                element={slide.figureBlocks[el.id]}
                deltaWidth={deltaWidth}
                deltaHeight={deltaHeight}
            />
        default:
            return null
    }
}

function SlideElement({slide, element: el, setNewTextValue, selectElement, selectedElements, onDndStart, dndDelta, onResizeStart, resizeDelta}: propsType) {
    const elementData = getElementData(el, slide)
    if(!elementData)
        return <></>;

    const isActive = !!selectedElements.length && selectedElements[selectedElements.length - 1] === el.id;
    const isSelected = selectedElements.includes(el.id);

    const deltaWidth = isActive && resizeDelta ? resizeDelta.width : 0;
    const deltaHeight = isActive && resizeDelta ? resizeDelta.height : 0;
    const deltaPositionX = isActive && resizeDelta && (resizeDelta.x || resizeDelta.y) ? resizeDelta.x
                            : isSelected && dndDelta ? dndDelta.x
                                : 0;
    const deltaPositionY = isActive && resizeDelta && (resizeDelta.x || resizeDelta.y) ? resizeDelta.y
                            : isSelected && dndDelta ? dndDelta.y
                                : 0;

    return <div
        className={`${s.element} ${isSelected ? s.selected: ''}`}
        style={{
            'width': elementData.width + deltaWidth,
            'height': elementData.height + deltaHeight,
            'top': elementData.position.y + deltaPositionY,
            'left': elementData.position.x + deltaPositionX,
        }}
        onMouseDown={(event) => {
            if(!event.altKey) {
                selectElement(elementData.id, event.ctrlKey);
            }
            if (onDndStart) {
                onDndStart(event);
            }
        }}
    >
        {switchElement(el, slide, isActive, isSelected, setNewTextValue, deltaWidth, deltaHeight)}
        {isActive && <ResizeComponent onResizeStart={onResizeStart} width={elementData.width} height={elementData.height}/>}
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