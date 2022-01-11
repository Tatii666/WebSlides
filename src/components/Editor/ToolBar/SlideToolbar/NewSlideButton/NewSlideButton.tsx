import React from 'react';
import s from './NewSlideButton.module.css';
import {ToolbarText} from "../../ToolbarText/ToolbarText";

type propsType = {
    addNewSlide: () => void,
}

function NewSlideButton({addNewSlide}: propsType) {
    return (
        <div className={s.newSlideButton} contentEditable={false} onClick={addNewSlide}>
            <ToolbarText text="слайд" />
            <div className={s.buttonIcon}>
                NEW SLIDE
            </div>
        </div>
    );
}

export {NewSlideButton};