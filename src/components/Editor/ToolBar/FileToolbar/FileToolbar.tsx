import React, {ChangeEvent, useRef} from 'react';
import s from './FileToolbar.module.css';
import {FileTitleContainer} from "./FileTitle/FileTitle";
import {FileButtons} from "./FileButtons/FileButtons";
import {ReactComponent as newButtonIcon} from "../../../../img/NewFile2.svg"
import {ReactComponent as loadButtonIcon} from "../../../../img/LoadFile2.svg"
import {ReactComponent as saveButtonIcon} from "../../../../img/SaveFile2.svg"
import {PresentationType} from "../../../../dataModel/editorDataModel";
import {UndoRedoButtonsContainer} from "./UndoRedoButtons/UndoRedoButtons";
import {connect} from "react-redux";
import {dispatchType, stateType} from "../../../../store/store";
import {createNewPresentationAC, loadPresentationAC, savePresentationAC} from "../../../../store/presentationReducer";

const PRESENTATION_FILE_EXTENTION = 'json';

type propsType = {
    onNewPresentation: Function,
    onSavePresentation: Function,
    onLoadPresentation: Function,
}

function FileToolbar({onNewPresentation, onSavePresentation, onLoadPresentation}: propsType) {
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
            <FileTitleContainer />
            <div className={s.fileToolbarButtons}>
                <FileButtons text="NEW" icon={newButtonIcon} onClick={() => onNewPresentation()} />
                <FileButtons text="LOAD" icon={loadButtonIcon} onClick={onLoadPresentationClick} />
                <FileButtons text="SAVE" icon={saveButtonIcon} onClick={() => onSavePresentation()} />
                <UndoRedoButtonsContainer />
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

const mapStateToProps = (state: stateType) => {
    return {

    }
}
const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        onNewPresentation: () => dispatch(createNewPresentationAC()),
        onSavePresentation: () => dispatch(savePresentationAC()),
        onLoadPresentation: (presentation: PresentationType) => dispatch(loadPresentationAC(presentation)),
    }
}

const FileToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(FileToolbar);

export {FileToolbarContainer};
