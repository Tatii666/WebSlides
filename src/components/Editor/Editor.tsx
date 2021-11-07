import React from 'react';
import s from './Editor.module.css';
import {ToolBar} from "./ToolBar/ToolBar";
import {SideBar} from "./SideBar/SideBar";
import {EditorArea} from "./EditorArea/EditorArea";
import {getEditor} from "../../editor";

function Editor() {
    return (
        <div className={s.editor}>
            <header className={s.header}>
                <ToolBar />
            </header>
            <div className={s.container}>
                <SideBar
                    slides={getEditor().Presentation.slides}
                    slidesOrder={getEditor().Presentation.slidesOrder}
                    selectedSlides={getEditor().selectedSlides}
                />
                <EditorArea />
            </div>
        </div>
    );
}


export {Editor};