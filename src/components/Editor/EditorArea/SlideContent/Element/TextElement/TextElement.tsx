import React, {useEffect, useRef, useState} from 'react';
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
            className={`${s.textElement}`}
            style={{
                'width':element.width,
                'height':element.height,
                'fontFamily': element.style.font ?? fontSettings.defaultFont,
                'fontSize': element.style.size ?? fontSettings.defaultSize,
                'color': toStringColor(element.style.color),
                'backgroundColor': toStringColor(element.style.backgroundColor),
            }}
            onInput={(e: React.FormEvent) => {
                const element: HTMLDivElement = e.target as HTMLDivElement
                setValue(element.innerHTML)
            }}
            onMouseDown={(e) => {
                if(isEditable) {
                    e.stopPropagation()
                }
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
                if (isEditable && (event.code === 'Delete' || event.code === 'Backspace') ) {
                    event.stopPropagation();
                }
                if (isEditable && (event.code === 'Escape')) {
                    setIsEditable(false);
                }
            }}
        >

        </div>
    );
}


export {TextElement};