import React from 'react';
import s from './PresentationToolbar.module.css';
import {PreviewButton} from "./PreviewButton/PreviewButton";
import {ExportButton} from "./ExportButton/ExportButton";

function PresentationToolbar() {
    return (
        <div className={s.presentationToolbar}>
            <PreviewButton />
            <ExportButton />
        </div>
    );
}


export {PresentationToolbar};