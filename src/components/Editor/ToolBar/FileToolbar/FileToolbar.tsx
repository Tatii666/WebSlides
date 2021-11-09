import React, {ChangeEvent, useRef} from 'react';
import s from './FileToolbar.module.css';
import {FileTitle} from "./FileTitle/FileTitle";
import {FileButtons} from "./FileButtons/FileButtons";
import newButtonIcon from "../../../../img/NewFile.svg"
import loadButtonIcon from "../../../../img/LoadFile.svg"
import saveButtonIcon from "../../../../img/SaveFile.svg"
import {dispatch} from "../../../../editor";
import {loadPresentation, newPresentation, savePresentation} from "../../../../functions";
import {PresentationType} from "../../../../dataModel/editorDataModel";
import {UndoReduButtons} from "./UndoRedoButtons/UndoRedoButtons";

const PRESENTATION_FILE_EXTENTION = 'json';

function onNewPresentation() {
    dispatch(newPresentation, {});
}

function onLoadPresentation(presentation: PresentationType) {
    dispatch(loadPresentation, {presentation})
}

function onSavePresentation() {
    dispatch(savePresentation, {});
}

function readFile(file: File){
    const reader = new FileReader();

    reader.readAsText(file);
    reader.onload = function() {
        if (typeof (reader.result) === 'string') {
            onLoadPresentation(JSON.parse(reader.result))
        }
    };
    reader.onerror = function() {
        console.error(reader.error);
    };
}

type propsType = {
    title: string,
}

function FileToolbar({title}: propsType) {
    const inputFile = useRef<HTMLInputElement>(null);
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            const parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            if (fileType !== PRESENTATION_FILE_EXTENTION) {
                console.error("Incorrect presentation file!");
                return
            }
            readFile(files[0]);

        }
        if (inputFile.current) {
            inputFile.current.value = '';
        }
    };

    function onLoadPresentationClick() {
        inputFile.current && inputFile.current.click();
    }

    return (
        <div className={s.fileToolbar}>
            <FileTitle title={title}/>
            <div className={s.fileToolbarButtons}>
                <FileButtons text="NEW" iconSrc={newButtonIcon} onClick={onNewPresentation} />
                <FileButtons text="LOAD" iconSrc={loadButtonIcon} onClick={onLoadPresentationClick} />
                <FileButtons text="SAVE" iconSrc={saveButtonIcon} onClick={onSavePresentation} />
                <UndoReduButtons />
                <input
                    style={{ display: "none" }}
                    accept={`.${PRESENTATION_FILE_EXTENTION}`}
                    ref={inputFile}
                    onChange={handleFileUpload}
                    type="file"
                />
            </div>
        </div>
    );
}

export {FileToolbar};
