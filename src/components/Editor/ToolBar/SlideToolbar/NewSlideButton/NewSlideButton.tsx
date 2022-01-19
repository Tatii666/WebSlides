import React from 'react';
import s from './NewSlideButton.module.css';
import commonStyle from '../../../common/common.module.css';
import {ToolbarText} from "../../ToolbarText/ToolbarText";

type propsType = {
    addNewSlide: () => void,
}

function NewSlideButton({addNewSlide}: propsType) {
    return (
        <div className={`${s.newSlideButton} ${commonStyle.standardButtonHover}`} contentEditable={false} onClick={addNewSlide}>
            <ToolbarText text="слайд" />
            <div className={`${commonStyle.standardButtonIcon} ${s.buttonIcon}`}>
                NEW SLIDE
            </div>
        </div>
    );
}

export {NewSlideButton};