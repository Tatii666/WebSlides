import React from 'react';
import s from './PlayerButton.module.css';


function PlayerButton(props: any) {

    return (
        <div className={s.playerButton}>
            {props.value}
        </div>
    );
}


export {PlayerButton};