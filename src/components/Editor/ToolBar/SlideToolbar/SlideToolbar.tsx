import React from 'react';
import s from './SlideToolbar.module.css';
import {NewSlideButton} from "./NewSlideButton/NewSlideButton";

function SlideToolbar() {
    return (
        <div className={s.slideToolbar}>
            <NewSlideButton />
        </div>
    );
}


export {SlideToolbar};