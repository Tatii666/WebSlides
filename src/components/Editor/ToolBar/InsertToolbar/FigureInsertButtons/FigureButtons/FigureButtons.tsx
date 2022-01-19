import React from 'react';
import commonStyle from '../../../../common/common.module.css';
import s from './FigureButtons.module.css';
type propsType = {
    text: string,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
}
function FigureButtons({text, icon: Icon, onClick}: propsType) {
    return (
        <div className={`${s.FigureButtons} ${commonStyle.standardButtonHover}`} onClick={onClick}>
            <div className={`${commonStyle.standardButtonIcon} ${s.buttonIcon}`}>
                <Icon />
            </div>
        </div>
    );
}

export {FigureButtons};