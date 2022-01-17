import React from 'react';
import s from './FigureElement.module.css';
import {figureBlockType, figureType} from "../../../../../../dataModel/editorDataModel";
import {Triangle} from "./Circle/Triangle";
import {Circle} from "./Triangle/Circle";
import {Rectangle} from "./Rectangle/Rectangle";
import {modifyElement, toStringColor} from "../../../../../../functions";
import {dispatch, getEditor} from "../../../../../../editor";

const STROKE_WIDTH = 3;

type propsType = {
    element: figureBlockType,
}

function switchFigure(figure: figureBlockType) {
    switch (figure.type) {
        case figureType.CIRCLE:
            return <Circle
                element={figure}
            />
        case figureType.TRIANGLE:
            return <Triangle
                element={figure}
            />
        case figureType.RECTANGLE:
            return <Rectangle
                element={figure}
            />
        default:
            return null
    }
}

function FigureElement({element}: propsType) {
    const handleMouseDown = (e:any) => {
        document.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
    };

    const handleMouseMove = (e:any) => {
        dispatch(modifyElement, {
            slideId: getEditor().activeSlide,
            elementId: element.id,
            newData: {
                x:  e.x - 600,
                y:  e.y - 400,
                width: element.width,
                height: element.height,
            }
        })
    };

    return (
        <svg id={element.id}
             className={`${s.figureElement}`}
             width={element.width}
             height={element.height}
             viewBox={`${-STROKE_WIDTH} ${-STROKE_WIDTH} ${element.width + STROKE_WIDTH * 2} ${element.height + STROKE_WIDTH * 2}`}
             fill={toStringColor(element.fillColor)}
             stroke={toStringColor(element.borderColor)}
             strokeWidth={`${STROKE_WIDTH}`}
        >
            {switchFigure(element)}
        </svg>
    );
}


export {FigureElement};