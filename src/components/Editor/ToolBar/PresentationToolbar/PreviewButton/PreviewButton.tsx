import React from 'react';
import s from './PreviewButton.module.css';

function PreviewButton() {
    return (
        <div className={s.previewButton} contentEditable={false} onClick={()=>console.log('run playing presentation...')}>
            <span>PREVIEW</span>
        </div>
    );
}

export {PreviewButton};