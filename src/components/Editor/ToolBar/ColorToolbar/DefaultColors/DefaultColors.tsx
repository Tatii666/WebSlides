import React from 'react';
import s from './DefaultColors.module.css';
import {colorType} from "../../../../../dataModel/editorDataModel";
import {toStringColor} from "../../../../../functions";

type propsType = {
    changeColors: Function,
    colors: Array<colorType>,
}

function DefaultColors({changeColors, colors}: propsType) {
    return (
        <div className={s.defaultColor}>
            {colors.map(color => {
                return (
                    <div
                        className={s.colorItem}
                        onClick={e => changeColors({color: color})}
                        onContextMenu={e => {
                            e.preventDefault();
                            changeColors({backgroundColor: color})
                        }}
                        style={{
                            backgroundColor: toStringColor(color),
                        }}
                    > </div>)
            })}
        </div>
    );
}

export {DefaultColors};