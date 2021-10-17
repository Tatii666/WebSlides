import React from 'react';
import s from './FileToolbar.module.css';
import {FileTitle} from "./FileTitle/FileTitle";
import {NewFileButton} from "./NewFileButton/NewFileButton";
import {LoadFileButton} from "./LoadFileButton/LoadFileButton";
import {SaveFileButton} from "./SaveFileButton/SaveFileButton";
import {RedoButton} from "./RedoButton/RedoButton";
import {UndoButton} from "./UndoButton/UndoButton";

const title='Our new slides';

function FileToolbar() {
    return (
        <div className={s.fileToolbar}>
            <FileTitle title={title}/>
            <div className={s.fileToolbarButtons}>
                <NewFileButton/>
                <LoadFileButton/>
                <SaveFileButton/>
                <div className={s.undoRedoButtons}>
                    <RedoButton/>
                    <UndoButton/>
                </div>
            </div>
        </div>
    );
}


export {FileToolbar};