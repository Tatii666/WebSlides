import React from 'react';
import s from './PlayerButton.module.css';


function PlayerButton(props: any) {

    return (
        <button className={s.playerButton}>
            {props.value}
        </button>
    );
}


export {PlayerButton};