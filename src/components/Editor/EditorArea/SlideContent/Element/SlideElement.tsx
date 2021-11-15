import React from 'react';
import {ElementType, elementType, selectedElementsType, slideType} from "../../../../../dataModel/editorDataModel";
import {ImageElement} from "./ImageElement/ImageElement";
import {TextElement} from "./TextElement/TextElement";
import {FigureElement} from "./FigureElement/FigureElement";
import {getEditor} from "../../../../../editor";

type propsType = {
    slide: slideType,
    selectedElements: selectedElementsType,
    element: elementType,
}

function switchElement(el: elementType, slide: slideType) {
    switch (el.type) {
        case ElementType.IMAGE:
            return <ImageElement
                element={slide.imageBlocks[el.id]}
            />
        case ElementType.TEXT:
            return <TextElement
                element={slide.textBlocks[el.id]}
                fontSettings={getEditor().fontPicker}
            />
        case ElementType.FIGURE:
            return <FigureElement
                element={slide.figureBlocks[el.id]}
            />
        default:
            return null
    }
}

function SlideElement({slide, selectedElements, element: el}: propsType) {
    const isActive = selectedElements.length && selectedElements[0] === el.id;
    const isSelected = selectedElements.includes(el.id);

    return <>
        {switchElement(el, slide)}
    </>
}


export {SlideElement};