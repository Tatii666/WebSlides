import React from 'react';
import s from './ToolBar.module.css';
import {FileToolbar} from "./FileToolbar/FileToolbar";
import {SlideToolbar} from "./SlideToolbar/SlideToolbar";
import {InsertToolbar} from "./InsertToolbar/InsertToolbar";
import {FontToolbar} from "./FontToolbar/FontToolbar";
import {ColorToolbar} from "./ColorToolbar/ColorToolbar";
import {PresentationToolbar} from "./PresentationToolbar/PresentationToolbar";

function ToolBar() {
    return (
        <div className={s.toolbar}>
            <FileToolbar/>
            <SlideToolbar/>
            <InsertToolbar/>
            <FontToolbar/>
            <ColorToolbar />
            <PresentationToolbar />
        </div>
    );
}


export {ToolBar};