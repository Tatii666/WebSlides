import React from 'react';
import s from './AlignButton.module.css';
import commonStyle from '../../../common/common.module.css'

type propsType = {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: Function,
}

function AlignButton({icon: Icon, onClick}: propsType) {
    return (
        <div className={`${s.alignButton} ${commonStyle.standardButtonHover}`}
            onClick={() => onClick()}
        >
            <Icon className={`${s.alignButton_icon} ${commonStyle.standardButtonIcon}`}/>
        </div>
    );
}

export {AlignButton};