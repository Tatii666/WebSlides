import React, {useEffect, useState} from 'react';
import s from './ActiveColors.module.css';
import {parseColor, toHexStringColor} from "../../../../../store/presentationReducer";
import {colorType} from "../../../../../dataModel/editorDataModel";

type propsType = {
    changeColors: Function,
    addUserColor: Function,
    currentColors: {
        color: colorType|undefined,
        backgroundColor: colorType,
    }|null,
}

const DEFAULT_COLOR = '#000000';
const DEFAULT_BACKGROUND_COLOR = '#FFFFFF';

function ActiveColors({changeColors, currentColors, addUserColor}: propsType) {
    const color = currentColors && currentColors.color ? toHexStringColor(currentColors.color) : DEFAULT_COLOR;
    const backgroundColor = currentColors ? toHexStringColor(currentColors.backgroundColor) : DEFAULT_BACKGROUND_COLOR;

    const [c, setC] = useState(color);
    const [bc, setBc] = useState(backgroundColor);

    useEffect( () => {
        setC(color);
        setBc(backgroundColor);
    }, [currentColors]);

    return (
        <div className={s.activeColors}>
            <div className={s.colorInputWrapper}>
                <input type="color"
                       className={`${s.colorInput} ${currentColors && currentColors.color === 'none'? s.colorInput_transparent : ''}`}
                       onBlur={(event) => {
                           const color = parseColor(event.target.value);
                           changeColors({color});
                           addUserColor(color);
                       }}
                       onContextMenu={event => event.preventDefault()}
                       onChange={e => setC(e.target.value)}
                       value={c}
                />
                <label className={s.colorLabel}>Color</label>
            </div>
            <div className={s.colorInputWrapper}>
                <input type="color"
                       className={`${s.colorInput} ${currentColors && currentColors.backgroundColor === 'none'? s.colorInput_transparent : ''}`}
                       onBlur={(event) => {
                           const backgroundColor = parseColor(event.target.value);
                           changeColors({backgroundColor});
                           addUserColor(backgroundColor);
                       }}
                       onContextMenu={event => event.preventDefault()}
                       onChange={e => setBc(e.target.value)}
                       value={bc}
                />
                <label className={s.colorLabel}>Background color</label>
            </div>
        </div>
    );
}

export {ActiveColors};