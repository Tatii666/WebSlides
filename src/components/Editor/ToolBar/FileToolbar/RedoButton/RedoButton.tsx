import React from 'react';
import s from './RedoButton.module.css';
import Redo from '../../../../../img/Redo.png'

function RedoButton() {
    return (
        <div className={s.redoButton} onClick={()=>console.log('redo')}>
            <img src={Redo}/>
        </div>
    );
}


export {RedoButton};