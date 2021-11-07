import React from 'react';
import s from './FileToolbar.module.css';
import {FileTitle} from "./FileTitle/FileTitle";
import {RedoButton} from "./RedoButton/RedoButton";
import {UndoButton} from "./UndoButton/UndoButton";
import {FileButtons} from "./FileButtons/FileButtons";
import newButtonIcon from "../../../../img/NewFile (2).png"
import loadButtonIcon from "../../../../img/LoadFile.png"
import saveButtonIcon from "../../../../img/SaveFile.png"
import {dispatch, getEditor} from "../../../../editor";
import {newPresentation, savePresentation} from "../../../../functions";

function onNewPresentationClick() {
    dispatch(newPresentation, {});
}
function onLoadPresentationClick() {
    return
}
function onSavePresentationClick() {
    dispatch(savePresentation, {});
}

function FileToolbar() {
    return (
        <div className={s.fileToolbar}>
            <FileTitle title={getEditor().Presentation.title}/>
            <div className={s.fileToolbarButtons}>
                <FileButtons text="NEW" iconSrc={newButtonIcon} onClick={onNewPresentationClick} />
                <FileButtons text="LOAD" iconSrc={loadButtonIcon} onClick={onLoadPresentationClick} />
                <FileButtons text="SAVE" iconSrc={saveButtonIcon} onClick={onSavePresentationClick} />
                <div className={s.undoRedoButtons}>
                    <RedoButton/>
                    <UndoButton/>
                </div>
            </div>
        </div>
    );
}


export {FileToolbar};