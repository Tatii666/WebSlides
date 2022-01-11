import React from 'react';
import s from './PreviewButton.module.css';

type PropsType = {
    isActive: boolean,
    setViewMode: Function,
}

function PreviewButton({isActive, setViewMode}: PropsType) {
    const onClick = () => {
        if (isActive)
            setViewMode()
    }

    const activeClass = isActive ? ` ${s.previewButton_active}` : '';
    return (
        <div className={s.previewButton + activeClass} contentEditable={false} onClick={onClick}>
            <span>PREVIEW</span>
        </div>
    );
}

export {PreviewButton};