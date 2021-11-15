import React from 'react';
import s from './ImageElement.module.css';
import {imageBlockType} from "../../../../../../dataModel/editorDataModel";

type propsType = {
    element: imageBlockType,
}

function ImageElement({element}: propsType) {
    return (
        <svg id={element.id}
             className={s.imageElement}
             width={element.width}
             height={element.height}
             style={{
                 top: element.position.y,
                 left: element.position.x,
             }}
             pointer-events='visible'
        >
            <g>
                <image
                    width={element.width}
                    height={element.height}
                    xlinkHref={element.image}
                />
            </g>
        </svg>
    );
}


export {ImageElement};