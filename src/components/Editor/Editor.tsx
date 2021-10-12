import React from 'react';
import s from './Editor.module.css';
import {ToolBar} from "./ToolBar/ToolBar";
import {SideBar} from "./SideBar/SideBar";
import {EditorArea} from "./EditorArea/EditorArea";

function Editor() {
    return (
        <div className={s.editor}>
            <header className={s.header}>
                <ToolBar />
            </header>
            <div className={s.container}>
                <SideBar />
                <EditorArea />
            </div>
        </div>
    );
}


export {Editor};