import React from 'react';
import s from './InsertToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {FigureInsertButtons} from "./FigureInsertButtons/FigureInsertButtons";
import {InsertButtons} from "./InsertButtons/InsertButtons";
import {ReactComponent as PictureIcon} from "../../../../img/addImage2.svg";
import {ReactComponent as TextIcon} from "../../../../img/addText2.svg";

function InsertToolbar() {
    return (
        <div className={s.insertToolbar} >
            <ToolbarText text='вставка' />
            <InsertButtons icon={PictureIcon} text={'PICTURE'} onClick={() => {}}/>
            <FigureInsertButtons />
            <InsertButtons icon={TextIcon} text={'TEXT'} onClick={() => {}}/>
        </div>
    );
}

export {InsertToolbar};