import React from 'react';
import s from './CloseButton.module.css';

type propsType = {
    setEditorMode: Function,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
}

function CloseButton ({setEditorMode, icon: Icon}: propsType){
    return (
        <div className={s.closeButton} onClick={() => setEditorMode()}>
            <Icon />
        </div>
    );
}

export {CloseButton};