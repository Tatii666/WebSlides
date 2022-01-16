import React from 'react';
import s from './ImageElement.module.css';
import commonStyles from '../../../../common/common.module.css'
import {imageBlockType} from "../../../../../../dataModel/editorDataModel";

type propsType = {
    element: imageBlockType,
    isSelected: boolean,
    selectElement: Function,
}

function ImageElement({element, selectElement, isSelected}: propsType) {
    return (
        <img id={element.id}
             className={`${s.imageElement} ${commonStyles.element} ${isSelected ? commonStyles.selected: ''}`}
             width={element.width}
             height={element.height}
             src={element.image}
             style={{
                 top: element.position.y,
                 left: element.position.x,
             }}
             onClick={(event) => {
                 selectElement(element.id, event.ctrlKey);
             }}
        />
    );
}


export {ImageElement};