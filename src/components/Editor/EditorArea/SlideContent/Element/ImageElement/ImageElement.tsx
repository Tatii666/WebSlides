import React from 'react';
import s from './ImageElement.module.css';
import {imageBlockType} from "../../../../../../dataModel/editorDataModel";

type propsType = {
    element: imageBlockType,
}

function ImageElement({element}: propsType) {
    return (
        <img id={element.id}
             className={`${s.imageElement}`}
             width={element.width}
             height={element.height}
             src={element.image}
        />
    );
}


export {ImageElement};