import React from 'react';
import s from './InsertToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {FigureInsertButtons} from "./FigureInsertButtons/FigureInsertButtons";
import {InsertButtons} from "./InsertButtons/InsertButtons";
import ImageIcon from "../../../../img/addImage.svg";
import TextIcon from "../../../../img/addText.svg";

function InsertToolbar() {
    return (
        <div className={s.insertToolbar} >
            <ToolbarText text='вставка' />
            <InsertButtons text="PICTURE" iconSrc={ImageIcon} />
            <FigureInsertButtons />
            <InsertButtons text="TEXT" iconSrc={TextIcon} />
        </div>
    );
}

export {InsertToolbar};