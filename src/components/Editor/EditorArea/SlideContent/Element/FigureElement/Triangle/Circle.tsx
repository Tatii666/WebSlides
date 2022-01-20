import React from 'react';
import s from './Circle.module.css';
import {figureBlockType} from "../../../../../../../dataModel/editorDataModel";

type propsType = {
    element: figureBlockType,
    deltaWidth: number,
    deltaHeight: number,
}

function Circle({element, deltaWidth, deltaHeight}: propsType) {
    return (
        <g>
            <ellipse
                cx={(element.width + deltaWidth) / 2}
                cy={(element.height + deltaHeight) / 2}
                rx={(element.width + deltaWidth) / 2}
                ry={(element.height + deltaHeight) / 2}
                pointerEvents='visible'
            />
        </g>
    );
}


export {Circle};