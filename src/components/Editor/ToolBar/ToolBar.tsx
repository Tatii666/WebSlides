import React from 'react';
import s from './ToolBar.module.css';
import {FileToolbar} from "./FileToolbar/FileToolbar";
import {SlideToolbar} from "./SlideToolbar/SlideToolbar";
import {InsertToolbar} from "./InsertToolbar/InsertToolbar";
import {FontToolbar} from "./FontToolbar/FontToolbar";
import {ColorToolbar} from "./ColorToolbar/ColorToolbar";
import {PresentationToolbar} from "./PresentationToolbar/PresentationToolbar";
import {EditorType} from "../../../dataModel/editorDataModel";

type PropsType = {
    editor: EditorType,
}
function ToolBar({editor}: PropsType) {
    return (
        <div className={s.toolbar}>
            <FileToolbar title={editor.Presentation.title}/>
            <SlideToolbar/>
            <InsertToolbar/>
            <FontToolbar/>
            <ColorToolbar />
            <PresentationToolbar Presentation={editor.Presentation}/>
        </div>
    );
}


export {ToolBar};