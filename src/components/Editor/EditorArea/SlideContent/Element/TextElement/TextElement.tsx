import React, {useEffect, useRef, useState} from 'react';
import s from './TextElement.module.css';
import {fontPickerType, idType, textBlockType} from "../../../../../../dataModel/editorDataModel";
import {toStringColor} from "../../../../../../functions";
import commonStyles from "../../../../common/common.module.css";

type propsType = {
    element: textBlockType,
    slideId: idType,
    fontSettings: fontPickerType,
    isActive: boolean,
    isSelected: boolean,
    setNewTextValue: Function,
    selectElement: Function,
}

function TextElement({element, slideId, fontSettings, isActive, isSelected, setNewTextValue, selectElement}: propsType) {
    const [newValue, setValue] = useState(element.value);
    const [isEditable, setIsEditable] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef && textRef.current) {
            textRef.current.focus();
        }
    }, [isEditable]);

    return (
        <div
            ref={textRef}
            id={element.id}
            contentEditable={isEditable}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{__html: element.value}}
            className={`${s.textElement} ${commonStyles.element} ${isSelected ? commonStyles.selected: ''}`}
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
                setValue(element.innerHTML)
            }}
            onDoubleClick={() => {
                setIsEditable(true);
            }}
            onBlur={() => {
                setNewTextValue(newValue, slideId, element.id);
                setIsEditable(false);
            }}
            onKeyDown={(event) => {
                if (event.code === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    document.execCommand("insertLineBreak");
                }
            }}
            onClick={(event) => {
                selectElement(element.id, event.ctrlKey);
            }}
        >

        </div>
    );
}


export {TextElement};