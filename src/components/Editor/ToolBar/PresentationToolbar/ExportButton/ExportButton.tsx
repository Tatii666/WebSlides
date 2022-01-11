import React from 'react';
import s from './ExportButton.module.css';

type propsType = {
    isDisabled: boolean,
}

function ExportButton({isDisabled}: propsType) {
    const classes = `${s.exportButton} ${isDisabled? s.exportButton_disabled : ''} `
    return (
        <div className={classes} onClick={()=>{}}>
            <span>EXPORT PDF</span>
        </div>
    );
}

export {ExportButton};