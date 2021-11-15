import React from 'react';
import s from './Triangle.module.css';
import {figureBlockType} from "../../../../../../../dataModel/editorDataModel";

type propsType = {
    element: figureBlockType,
}

function Triangle({element}: propsType) {
    return (
        <g>
            <polygon
                points={`0 ${element.height}, ${element.width/2} 0, ${element.width} ${element.height}`}
                pointer-events='visible'
            />
        </g>
    );
}


export {Triangle};