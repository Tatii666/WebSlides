import React from 'react';
import s from './FontToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {FontSelect} from "./FontSelect/FontSelect";
import {FontSizeSelect} from "./FontSizeSelect/FontSizeSelect";

function FontToolbar() {
    return (
        <div className={s.fontToolbar}>
            <div className={s.fontToolbarButtons}>
                <FontSelect />
                <FontSizeSelect />
            </div>
            <ToolbarText text="font" />
        </div>
    );
}

export {FontToolbar};