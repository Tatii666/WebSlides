import React from 'react';
import s from './Editor.module.css';
import {ToolBarContainer} from "./ToolBar/ToolBar";
import {SideBarContainer} from "./SideBar/SideBar";
import {EditorAreaContainer} from "./EditorArea/EditorArea";

function Editor() {
    return (
        <div className={s.editor}>
            <header className={s.header}>
                <ToolBarContainer />
            </header>
            <div className={s.container}>
                <SideBarContainer />
                <EditorAreaContainer />
            </div>
        </div>
    );
}


export {Editor};