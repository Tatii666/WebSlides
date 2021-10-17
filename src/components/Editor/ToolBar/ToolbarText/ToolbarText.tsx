import React from 'react';
import s from './ToolbarText.module.css';

function ToolbarText(props: any) {
    return (
        <div className={s.toolbarText}>
            {props.text}
        </div>
    );
}

export {ToolbarText};