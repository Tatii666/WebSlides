import React from 'react';
import s from './FileToolbar.module.css';
import {FileTitle} from "./FileTitle/FileTitle";
import {RedoButton} from "./RedoButton/RedoButton";
import {UndoButton} from "./UndoButton/UndoButton";
import {FileButtons} from "./FileButtons/FileButtons";
import newButtonIcon from "../../../../img/NewFile (2).png"
import loadButtonIcon from "../../../../img/LoadFile.png"
import saveButtonIcon from "../../../../img/SaveFile.png"

const title='Our new slides';

function FileToolbar() {
    return (
        <div className={s.fileToolbar}>
            <FileTitle title={title}/>
            <div className={s.fileToolbarButtons}>
                <FileButtons text="NEW" iconSrc={newButtonIcon}/>
                <FileButtons text="LOAD" iconSrc={loadButtonIcon}/>
                <FileButtons text="SAVE" iconSrc={saveButtonIcon}/>
                <div className={s.undoRedoButtons}>
                    <RedoButton/>
                    <UndoButton/>
                </div>
            </div>
        </div>
    );
}


export {FileToolbar};