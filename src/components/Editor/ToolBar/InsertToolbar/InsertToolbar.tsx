import React, {ChangeEvent, useRef} from 'react';
import s from './InsertToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {FigureInsertButtons} from "./FigureInsertButtons/FigureInsertButtons";
import {InsertButtons} from "./InsertButtons/InsertButtons";
import {ReactComponent as PictureIcon} from "../../../../img/addImage2.svg";
import {ReactComponent as TextIcon} from "../../../../img/addText2.svg";

const IMAGE_FILE_EXTENTION = ['jpg', 'png', 'bmp'];

function InsertToolbar() {
    const inputFile = useRef<HTMLInputElement>(null);
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            const parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            if (!IMAGE_FILE_EXTENTION.includes(fileType)) {
                console.error("Incorrect image file!");
                return
            }
            // readFile(files[0]);

        }
        if (inputFile.current) {
            inputFile.current.value = '';
        }
    };

    return (
        <div className={s.insertToolbar} >
            <ToolbarText text='вставка' />
            <InsertButtons icon={PictureIcon} text={'PICTURE'} onClick={() => {}}/>
            <FigureInsertButtons />
            <InsertButtons icon={TextIcon} text={'TEXT'} onClick={() => {}}/>
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

export {InsertToolbar};