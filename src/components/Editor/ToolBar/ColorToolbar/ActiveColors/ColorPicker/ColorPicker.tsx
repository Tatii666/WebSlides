import React from 'react';
import s from './ColorPicker.module.css';

function ColorPicker() {
    return (
        <div className={s.colorPicker}>
            <input className={s.activeColors} type="color"/>
        </div>
    );
}

export {ColorPicker};