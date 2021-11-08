import React from 'react';
import s from './ToolBar.module.css';
import {FileToolbar} from "./FileToolbar/FileToolbar";
import {SlideToolbar} from "./SlideToolbar/SlideToolbar";
import {InsertToolbar} from "./InsertToolbar/InsertToolbar";
import {FontToolbar} from "./FontToolbar/FontToolbar";
import {ColorToolbar} from "./ColorToolbar/ColorToolbar";
import {PresentationToolbar} from "./PresentationToolbar/PresentationToolbar";
import {getEditor} from "../../../editor";

function ToolBar() {
    return (
        <div className={s.toolbar}>
            <FileToolbar title={getEditor().Presentation.title}/>
            <SlideToolbar/>
            <InsertToolbar/>
            <FontToolbar/>
            <ColorToolbar />
            <PresentationToolbar />
        </div>
    );
}


export {ToolBar};