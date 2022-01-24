import React from 'react';
import s from './FigureElement.module.css';
import {figureBlockType, figureType} from "../../../../../../dataModel/editorDataModel";
import {Triangle} from "./Circle/Triangle";
import {Circle} from "./Triangle/Circle";
import {Rectangle} from "./Rectangle/Rectangle";
import {toStringColor} from "../../../../../../store/presentationReducer";

const STROKE_WIDTH = 3;

type propsType = {
    element: figureBlockType,
    deltaWidth?: number,
    deltaHeight?: number,
}

function switchFigure(figure: figureBlockType, deltaWidth: number, deltaHeight: number) {
    switch (figure.type) {
        case figureType.CIRCLE:
            return <Circle
                element={figure}
                deltaWidth={deltaWidth}
                deltaHeight={deltaHeight}
            />
        case figureType.TRIANGLE:
            return <Triangle
                element={figure}
                deltaWidth={deltaWidth}
                deltaHeight={deltaHeight}
            />
        case figureType.RECTANGLE:
            return <Rectangle
                element={figure}
                deltaWidth={deltaWidth}
                deltaHeight={deltaHeight}
            />
        default:
            return null
    }
}

function FigureElement({element, deltaWidth = 0, deltaHeight = 0}: propsType) {
    return (
        <svg id={element.id}
             className={`${s.figureElement}`}
             width={element.width + deltaWidth}
             height={element.height + deltaHeight}
             viewBox={`${-STROKE_WIDTH} ${-STROKE_WIDTH} ${element.width + deltaWidth + STROKE_WIDTH * 2} ${element.height + deltaHeight + STROKE_WIDTH * 2}`}
             fill={toStringColor(element.styles.backgroundColor)}
             stroke={toStringColor(element.styles.color)}
             strokeWidth={`${STROKE_WIDTH}`}
        >
            {switchFigure(element, deltaWidth, deltaHeight)}
        </svg>
    );
}


export {FigureElement};