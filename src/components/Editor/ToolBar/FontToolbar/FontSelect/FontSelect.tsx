import React from 'react';
import s from './FontSelect.module.css';

function FontSelect() {
    return (
        <div className={s.fontSelectContainer}>
            <select className={s.fontSelect} name="" id="">
                <option value="arial">Arial</option>
                <option value="times">Times New Roman</option>
                <option value="tahoma">Tahoma</option>
                <option value="comic">Comic</option>
            </select>
        </div>
    );
}

export {FontSelect};