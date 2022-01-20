import React from 'react';
import s from './ImageElement.module.css';
import {imageBlockType} from "../../../../../../dataModel/editorDataModel";

type propsType = {
    element: imageBlockType,
    deltaWidth?: number,
    deltaHeight?: number,
}

function ImageElement({element, deltaWidth = 0, deltaHeight = 0}: propsType) {
    return (
        <img id={element.id}
             className={`${s.imageElement}`}
             width={element.width + deltaWidth}
             height={element.height + deltaHeight}
             src={element.image}
             draggable={false}
        />
    );
}


export {ImageElement};