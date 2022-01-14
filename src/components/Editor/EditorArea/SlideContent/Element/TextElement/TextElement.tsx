import React, {useState} from 'react';
import s from './TextElement.module.css';
import {fontPickerType, idType, textBlockType} from "../../../../../../dataModel/editorDataModel";
import {toStringColor} from "../../../../../../functions";

type propsType = {
    element: textBlockType,
    slideId: idType,
    fontSettings: fontPickerType,
    isActive: boolean,
    setNewTextValue: Function,
}

function TextElement({element, slideId, fontSettings, isActive, setNewTextValue}: propsType) {
    const [newValue, setValue] = useState(element.value);

    return (
        <div
            id={element.id}
            contentEditable={isActive}
            suppressContentEditableWarning={true}
            className={s.textElement}
            style={{
                'width':element.width,
                'height':element.height,
                'top': element.position.y,
                'left': element.position.x,
                'fontFamily': element.style.font ?? fontSettings.defaultFont,
                'fontSize': element.style.size ?? fontSettings.defaultSize,
                'color': toStringColor(element.style.color),
                'backgroundColor': toStringColor(element.style.backgroundColor),
            }}
            onInput={(e: React.FormEvent) => {
                const element: HTMLDivElement = e.target as HTMLDivElement
                setValue(element.innerText)
            }}
            onBlur={() => {setNewTextValue(newValue, slideId, element.id)}}
        >
            {element.value}
        </div>
        // <textarea
        //     id={element.id}
        //     placeholder={'Введите ваш текст'}
        //     defaultValue={newValue}
        //     className={s.textElement}
        //     style={{
        //         'width':element.width,
        //         'height':element.height,
        //         'top': element.position.y,
        //         'left': element.position.x,
        //         'fontFamily': element.style.font ?? fontSettings.defaultFont,
        //         'fontSize': element.style.size ?? fontSettings.defaultSize,
        //         'color': toStringColor(element.style.color),
        //         'backgroundColor': toStringColor(element.style.backgroundColor),
        //     }}
        //     onChange={(e) => setValue(e.target.value)}
        //     onBlur={() => {setNewTextValue(newValue, slideId, element.id)}}
        // />

    );
}


export {TextElement};