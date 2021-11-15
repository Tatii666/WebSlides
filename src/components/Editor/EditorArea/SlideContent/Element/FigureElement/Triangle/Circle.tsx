import React from 'react';
import s from './Circle.module.css';
import {figureBlockType} from "../../../../../../../dataModel/editorDataModel";

type propsType = {
    element: figureBlockType,
}

function Circle({element}: propsType) {
    return (
        <g>
            <ellipse
                cx={element.width/2}
                cy={element.height/2}
                rx={element.width/2}
                ry={element.height/2}
                pointer-events='visible'
            />
        </g>
    );
}


export {Circle};