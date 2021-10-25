import React from 'react';
import s from './FigureButtons.module.css';

function FigureButtons(props: any) {
    return (
        <div className={s.FigureButtons}>
            <div className={s.buttonIcon}>
                <img src={props.iconSrc}/>
            </div>
        </div>
    );
}

export {FigureButtons};