import React from 'react';
import s from './ColorToolbar.module.css';
import {ToolbarText} from "../ToolbarText/ToolbarText";
import {ActiveColors} from "./ActiveColors/ActiveColors";

function ColorToolbar() {
    return (
        <div className={s.colorToolbar}>
            <div className={s.colorToolbar}>
                <ActiveColors />
                {/*<DefaultColors />*/}
            </div>
            <ToolbarText text="цвет" />
        </div>
    );
}

export {ColorToolbar};