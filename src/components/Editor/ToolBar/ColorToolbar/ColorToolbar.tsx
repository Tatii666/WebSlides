import React from 'react';
import s from './ColorToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";

function ColorToolbar() {
    return (
        <div className={s.colorToolbar}>

            <ToolbarText text="цвет" />
        </div>
    );
}

export {ColorToolbar};