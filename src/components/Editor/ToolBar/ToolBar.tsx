import React from 'react';
import s from './ToolBar.module.css';
import {FileToolbarContainer} from "./FileToolbar/FileToolbar";
import {SlideToolbarContainer} from "./SlideToolbar/SlideToolbar";
import {InsertToolbarContainer} from "./InsertToolbar/InsertToolbar";
import {FontToolbarContainer} from "./FontToolbar/FontToolbar";
import {ColorToolbarContainer} from "./ColorToolbar/ColorToolbar";
import {PresentationToolbarContainer} from "./PresentationToolbar/PresentationToolbar";

function ToolBar() {
    return (
        <div className={s.toolbar}>
            <FileToolbarContainer />
            <SlideToolbarContainer />
            <InsertToolbarContainer />
            <FontToolbarContainer/>
            <ColorToolbarContainer />
            <PresentationToolbarContainer />
        </div>
    );
}

export {ToolBar};