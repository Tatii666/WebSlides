import React from 'react';
import s from './NewSlideButton.module.css';
import {ToolbarText} from "../../ToolbarText/ToolbarText";
import {dispatch} from "../../../../../editor";
import {addNewSlide} from "../../../../../functions";

function onClick() {
    dispatch(addNewSlide, {})
}

function NewSlideButton() {
    return (
        <div className={s.newSlideButton} contentEditable={false}>
            <ToolbarText text="слайд" />
            <div className={s.buttonIcon} onClick={onClick}>
                NEW SLIDE
            </div>
        </div>
    );
}

export {NewSlideButton};