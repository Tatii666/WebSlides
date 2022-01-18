import React from 'react';
import s from './PlayerButton.module.css';

type propsType = {
    onClick: () => void,
    isActive?: (boolean|undefined),
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
}

function PlayerButton({onClick, icon: Icon, isActive}: propsType) {

    return (
        <div className={`${s.playerButton} ${isActive? s.playerButton_active: ''}`} onClick={onClick}>
            <Icon />
        </div>
    );
}

export {PlayerButton};