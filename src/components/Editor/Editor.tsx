import React from 'react';
import s from './Editor.module.css';
import {ToolBar} from "./ToolBar/ToolBar";
import {SideBar} from "./SideBar/SideBar";
import {EditorArea} from "./EditorArea/EditorArea";

const slides = ['slide1','slide2','slide3','slide4','slide5','slide6','slide7','slide8','slide9','slide10',]

function Editor() {
    return (
        <div className={s.editor}>
            <header className={s.header}>
                <ToolBar />
            </header>
            <div className={s.container}>
                <SideBar slides={slides}/>
                <EditorArea />
            </div>
        </div>
    );
}


export {Editor};