import React, {ChangeEvent, useRef} from 'react';
import s from './InsertToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {FigureInsertButtons} from "./FigureInsertButtons/FigureInsertButtons";
import {InsertButton} from "./InsertButtons/InsertButton";
import {ReactComponent as PictureIcon} from "../../../../img/addImage2.svg";
import {ReactComponent as TextIcon} from "../../../../img/addText2.svg";
import {dispatchType, stateType} from "../../../../store/store";
import {connect} from "react-redux";
import {addFigureBlockAC, addImageBlockAC, addTextBlockAC} from "../../../../store/presentationReducer";
import {figureTypeType} from "../../../../dataModel/editorDataModel";

const IMAGE_FILE_EXTENTION = ['jpg', 'png', 'bmp'];

type propsType = {
    addFigure: Function,
    addText: Function,
    addImage: Function,
}

function InsertToolbar({addFigure, addText, addImage}: propsType) {
    const inputFile = useRef<HTMLInputElement>(null);
    const readFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = function() {
            if (typeof reader.result === 'string') {
                const image = new Image();
                image.onload = function(){
                    addImage(reader.result, image.width, image.height);
                };
                image.src = reader.result
            }
        };
        reader.onerror = function() {
            console.error(reader.error);
        };
        reader.readAsDataURL(file);
    }
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            const parts = filename.split(".");
            const fileType = parts[parts.length - 1].toLowerCase();
            if (!IMAGE_FILE_EXTENTION.includes(fileType)) {
                console.error("Incorrect image file!");
                return
            }
            readFile(files[0]);

        }
        if (inputFile.current) {
            inputFile.current.value = '';
        }
    };

    function onLoadImageClick() {
        inputFile.current && inputFile.current.click();
    }

    return (
        <div className={s.insertToolbar} >
            <ToolbarText text='вставка' />
            <InsertButton icon={PictureIcon} text={'PICTURE'} onClick={onLoadImageClick}/>
            <FigureInsertButtons addFigure={addFigure}/>
            <InsertButton icon={TextIcon} text={'TEXT'} onClick={() => {addText()}}/>
            <input
                style={{ display: "none" }}
                accept={`${IMAGE_FILE_EXTENTION.reduce((acc, el) => acc + `.${el},`, '')}`}
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
            />
        </div>
    );
}


const mapStateToProps = (state: stateType) => {
    return {}
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        addFigure: (figureType: figureTypeType) => dispatch(addFigureBlockAC(figureType)),
        addText: () => dispatch(addTextBlockAC()),
        addImage: (dataURL: string, width: number, height: number) => dispatch(addImageBlockAC(dataURL, width, height)),
    }
}

const InsertToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(InsertToolbar);

export {InsertToolbarContainer};