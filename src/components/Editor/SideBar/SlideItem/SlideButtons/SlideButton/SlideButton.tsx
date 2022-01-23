import React from 'react';
import s from './SlideButton.module.css';

type propsType = {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
    className?: string,
}

function SlideButton({icon: Icon, onClick, className}: propsType) {
    return (
       <div className={`${s.slideButton} ${className}`} onClick={(e) => {
           e.stopPropagation();
           onClick();
       }}>
           <Icon />
       </div>
    );
}

export {SlideButton};