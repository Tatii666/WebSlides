import React from 'react';
import s from './InsertToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {PictureInsertButton} from "./PictureInsertButton/PictureInsertButton";
import {FigureInsertButtons} from "./FigureInsertButtons/FigureInsertButtons";
import {TextInsertButton} from "./TextInsertButton/TextInsertButton";

function InsertToolbar() {
    return (
        <div className={s.insertToolbar}>
            <ToolbarText text='вставка' />
                <PictureInsertButton />
                <FigureInsertButtons />
                <TextInsertButton />
        </div>
    );
}

export {InsertToolbar};