import React from 'react';
import s from './Editor.module.css';
import {ToolBar} from "./ToolBar/ToolBar";
import {SideBar} from "./SideBar/SideBar";
import {EditorArea} from "./EditorArea/EditorArea";
import {EditorType} from "../../dataModel/editorDataModel";

type EditorPropsType = {
    editor: EditorType,
}
/**
 * @param {{
 *   editor: EditorType,
 * }} props
 */
function Editor({editor}: EditorPropsType) {
    return (
        <div className={s.editor}>
            <header className={s.header}>
                <ToolBar />
            </header>
            <div className={s.container}>
                <SideBar
                    slides={editor.Presentation.slides}
                    slidesOrder={editor.Presentation.slidesOrder}
                    selectedSlides={editor.selectedSlides}
                    activeSlide={editor.activeSlide}
                />
                <EditorArea />
            </div>
        </div>
    );
}


export {Editor};