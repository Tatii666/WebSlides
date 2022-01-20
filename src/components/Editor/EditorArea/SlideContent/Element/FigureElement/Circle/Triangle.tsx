import React from 'react';
import s from './Triangle.module.css';
import {figureBlockType} from "../../../../../../../dataModel/editorDataModel";

type propsType = {
    element: figureBlockType,
    deltaWidth: number,
    deltaHeight: number,
}

function Triangle({element, deltaWidth, deltaHeight}: propsType) {
    return (
        <g>
            <polygon
                points={`0 ${element.height + deltaHeight}, ${(element.width + deltaWidth)/2} 0, ${element.width + deltaWidth} ${element.height + deltaHeight}`}
                pointerEvents='visible'
            />
        </g>
    );
}


export {Triangle};