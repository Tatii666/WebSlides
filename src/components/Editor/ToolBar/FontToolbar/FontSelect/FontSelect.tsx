import React from 'react';
import s from './FontSelect.module.css';

type propsType = {
    fonts: Array<string>,
    changeFontStyles: Function,
}

function FontSelect({fonts, changeFontStyles}: propsType) {
    return (
        <div className={s.fontSelectContainer}>
            <select className={s.fontSelect}
                onChange={(e) => changeFontStyles({font: e.target.value})}
                defaultValue={'-'}
            >
                {fonts.map((font) => <option key={'id_' + font} value={font}>{font}</option>)}
            </select>
        </div>
    );
}

export {FontSelect};