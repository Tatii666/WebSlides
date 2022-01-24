import React, {useEffect, useRef, useState} from 'react';
import s from './TextElement.module.css';
import {idType, textBlockType} from "../../../../../../dataModel/editorDataModel";
import {toStringColor} from "../../../../../../store/presentationReducer";

type propsType = {
    element: textBlockType,
    slideId: idType,
    setNewTextValue: Function,
    deltaWidth?: number,
    deltaHeight?: number,
}

const TEXT_PLACEHOLDER = 'Please, enter your text';

function TextElement({element, slideId, setNewTextValue, deltaWidth = 0, deltaHeight = 0}: propsType) {
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
            dangerouslySetInnerHTML={{__html: !isEditable && !element.value ? TEXT_PLACEHOLDER : element.value}}
            className={`${s.textElement}`}
            style={{
                'width':element.width + deltaWidth,
                'height':element.height + deltaHeight,
                'fontFamily': element.styles.font,
                'fontSize': element.styles.fontSize,
                'color': toStringColor(element.styles.color),
                'backgroundColor': toStringColor(element.styles.backgroundColor),
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
                if (event.ctrlKey && (event.code === 'KeyB' || event.code === 'KeyI' || event.code === 'KeyU')) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            }}
        >

        </div>
    );
}


export {TextElement};