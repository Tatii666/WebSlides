import React from 'react';
import s from './TextElement.module.css';
import {fontPickerType, textBlockType} from "../../../../../../dataModel/editorDataModel";
import {toStringColor} from "../../../../../../functions";

type propsType = {
    element: textBlockType,
    fontSettings: fontPickerType,
}

function TextElement({element, fontSettings}: propsType) {
    return (
        <svg id={element.id}
             className={s.textElement}
             width={element.width}
             height={element.height}
             style={{
                 top: element.position.y,
                 left: element.position.x,
             }}
        >
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div style={{
                    'fontFamily': element.style.font ?? fontSettings.defaultFont,
                    'fontSize': element.style.size ?? fontSettings.defaultSize,
                    'color': toStringColor(element.style.color),
                    'backgroundColor': toStringColor(element.style.backgroundColor),
                }}>
                    {element.value}
                </div>
            </foreignObject>
        </svg>
    );
}


export {TextElement};