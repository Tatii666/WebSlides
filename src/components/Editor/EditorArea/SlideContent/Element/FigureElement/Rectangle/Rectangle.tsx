import React from 'react';
import s from './Rectangle.module.css';
import {figureBlockType} from "../../../../../../../dataModel/editorDataModel";

type propsType = {
    element: figureBlockType,
}

function Rectangle({element}: propsType) {
    return (
        <g>
            <rect
                x={0} y={0}
                width={element.width}
                height={element.height}
                pointer-events='visible'
            />
        </g>
    );
}


export {Rectangle};