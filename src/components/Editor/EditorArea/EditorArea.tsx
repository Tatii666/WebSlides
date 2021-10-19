import React from 'react';
import s from './EditorArea.module.css';
import {SlideCanvas} from "./SlideCanvas/SlideCanvas";

function EditorArea() {
    return (
        <div className={s.editorArea}>
            <SlideCanvas />
        </div>
    );
}


export {EditorArea};