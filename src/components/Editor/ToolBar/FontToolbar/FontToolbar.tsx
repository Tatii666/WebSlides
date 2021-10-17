import React from 'react';
import s from './FontToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";

function FontToolbar() {
    return (
        <div className={s.fontToolbar}>
            <ToolbarText text='шрифт' />
        </div>
    );
}

export {FontToolbar};