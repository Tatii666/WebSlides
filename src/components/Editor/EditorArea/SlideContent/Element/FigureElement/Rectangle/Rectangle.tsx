import React from 'react';
import s from './Rectangle.module.css';
import {figureBlockType} from "../../../../../../../dataModel/editorDataModel";

type propsType = {
    element: figureBlockType,
    deltaWidth: number,
    deltaHeight: number,
}

function Rectangle({element, deltaWidth, deltaHeight}: propsType) {
    return (
        <g>
            <rect
                x={0} y={0}
                width={element.width + deltaWidth}
                height={element.height + deltaHeight}
                pointerEvents='visible'
            />
        </g>
    );
}


export {Rectangle};