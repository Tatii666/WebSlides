import React from 'react';
import s from './PresentationToolbar.module.css';
import {PreviewButton} from "./PreviewButton/PreviewButton";
import {ExportButton} from "./ExportButton/ExportButton";
import {PresentationType} from "../../../../dataModel/editorDataModel";

type PropsType = {
    Presentation: PresentationType,
}
function PresentationToolbar({Presentation}: PropsType) {
    return (
        <div className={s.presentationToolbar}>
            <PreviewButton isActive={!!Presentation.slidesOrder.length}/>
            <ExportButton />
        </div>
    );
}


export {PresentationToolbar};