import React from 'react';
import s from './FileButtons.module.css';
import commonStyle from '../../../common/common.module.css'

type propsType = {
    text: string,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
}

function FileButtons({text, icon: Icon, onClick}: propsType) {
    return (
        <div className={`${s.FileButtons} ${commonStyle.standardButtonHover}`} onClick={onClick}>
            <div className={commonStyle.standardButtonIcon}>
                <Icon />
            </div>
            <div className={s.buttonText}>{text}</div>
        </div>
    );
}

export {FileButtons};