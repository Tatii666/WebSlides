import React from 'react';
import s from './ExportButton.module.css';

function ExportButton() {
    return (
        <div className={s.exportButton} onClick={()=>console.log('exporting presentation...')}>
            <span>EXPORT</span>
        </div>
    );
}

export {ExportButton};