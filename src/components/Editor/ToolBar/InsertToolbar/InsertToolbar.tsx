import React from 'react';
import s from './InsertToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";

function InsertToolbar() {
    return (
        <div className={s.insertToolbar}>
            <ToolbarText text='вставка' />
        </div>
    );
}

export {InsertToolbar};