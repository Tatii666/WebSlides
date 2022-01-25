import React from 'react';
import s from './FontSizeSelect.module.css';

type propsType = {
    sizes: Array<number>,
    changeFontStyles: Function,
}

function FontSizeSelect({sizes, changeFontStyles}: propsType) {
    return (
        <div className={s.fontSelectContainer}>
            <select className={s.fontSelect}
                onChange={(e) => changeFontStyles({size: e.target.value})}
                defaultValue={28}
            >
                {sizes.map((size) => <option key={'id_' + size} value={size} selected={size === 28}>{size + 'px'}</option>)}
            </select>
        </div>
    );
}

export {FontSizeSelect};
