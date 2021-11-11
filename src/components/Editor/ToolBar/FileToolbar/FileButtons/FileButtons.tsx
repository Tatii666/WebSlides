import React from 'react';
import s from './FileButtons.module.css';

type propsType = {
    text: string,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
}

function FileButtons({text, icon: Icon, onClick}: propsType) {
    return (
        <div className={s.FileButtons} onClick={onClick}>
            <div className={s.buttonIcon}>
                <Icon />
            </div>
            <div className={s.buttonText}>{text}</div>
        </div>
    );
}

export {FileButtons};