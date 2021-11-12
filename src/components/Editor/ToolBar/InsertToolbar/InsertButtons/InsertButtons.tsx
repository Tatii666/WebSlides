import React from 'react';
import s from './InsertButtons.module.css';

type propsType = {
    text: string,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
}

function InsertButtons({text, icon: Icon, onClick}: propsType) {
    return (
        <div className={s.InsertButtons}>
            <div className={s.buttonIcon}>
                <Icon />
            </div>
            <div className={s.buttonText}>{text}</div>
        </div>
    );
}

export {InsertButtons};