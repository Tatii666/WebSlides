import React from 'react';
import s from './SlideButton.module.css';

type propsType = {
    icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>,
    onClick: () => void,
}

function SlideButton({icon: Icon, onClick}: propsType) {
    return (
       <div className={s.slideButton} onClick={(e) => {
           e.stopPropagation();
           onClick();
       }}>
           <Icon />
       </div>
    );
}

export {SlideButton};