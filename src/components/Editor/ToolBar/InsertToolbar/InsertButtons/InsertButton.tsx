import React from 'react';
import s from './InsertButton.module.css';

type propsType = {
    text: string,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
}

function InsertButton({text, icon: Icon, onClick}: propsType) {
    return (
        <div className={s.InsertButton} onClick={onClick}>
            <div className={s.buttonIcon}>
                <Icon />
            </div>
            <div className={s.buttonText}>{text}</div>
        </div>
    );
}

export {InsertButton};