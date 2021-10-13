import React from 'react';
import s from './SideBar.module.css';
import {SlideItem} from "./SlideItem/SlideItem";

function SideBar({slides}: any) {
    console.log(slides)
    return (
        <div className={s.sidebar}>
            {slides.map((slide: any, index: number) => <SlideItem slide={slide} key={index} index={index}/>)}
        </div>
    );
}

export {SideBar};