import React from 'react';
import s from './FigureButtons.module.css';
type propsType = {
    text: string,
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
}
function FigureButtons({text, icon: Icon, onClick}: propsType) {
    return (
        <div className={s.FigureButtons}>
            <div className={s.buttonIcon}>
                <Icon />
            </div>
        </div>
    );
}

export {FigureButtons};