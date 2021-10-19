import React from 'react';
import s from './FontSizeSelect.module.css';

function FontSizeSelect() {
    return (
        <div className={s.fontSelectContainer}>
            <select className={s.fontSelect} name="" id="">
                <option value="4">4px</option>
                <option value="6">6px</option>
                <option value="8">8px</option>
                <option value="10">10px</option>
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="20">20px</option>
            </select>
        </div>
    );
}

export {FontSizeSelect};