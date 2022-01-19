import React from 'react';
import s from './PlayerButton.module.css';
import commonStyle from '../../../Editor/common/common.module.css'

type propsType = {
    onClick: () => void,
    isActive?: (boolean|undefined),
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
}

function PlayerButton({onClick, icon: Icon, isActive}: propsType) {

    return (
        <div className={`${commonStyle.buttonIcon} ${commonStyle.standardButtonHover} ${s.playerButton}  ${isActive? s.playerButton_active: ''}`} onClick={onClick}>
            <Icon />
        </div>
    );
}

export {PlayerButton};