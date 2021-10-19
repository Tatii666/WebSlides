import React from 'react';
import s from './NewSlideButton.module.css';
import {ToolbarText} from "../../ToolbarText/ToolbarText";

function NewSlideButton() {
    return (
        <div className={s.newSlideButton}>
            <ToolbarText text="слайд" />
            <div className={s.buttonIcon}>
                NEW SLIDE
            </div>
        </div>
    );
}

export {NewSlideButton};