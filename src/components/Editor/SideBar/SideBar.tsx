import React from 'react';
import s from './SideBar.module.css';
import {SlideItem} from "./SlideItem/SlideItem";
import {
    selectedSlidesType,
    slidesOrderItemType,
    slidesOrderType,
    slidesType,
} from "../../../dataModel/editorDataModel";

type propsType = {
    slides: slidesType,
    slidesOrder: slidesOrderType,
    selectedSlides: selectedSlidesType,
}

function SideBar({slides, slidesOrder, selectedSlides}: propsType) {
    return (
        <div className={s.sidebar}>
            {slidesOrder.map((slide: slidesOrderItemType, index: number) => {
                return <SlideItem
                    slide={slides[slide.id]}
                    isSelected={selectedSlides.findIndex((el) => el.id === slide.id) !== -1}
                    key={index}
                    index={index}
                />
            })}
        </div>
    );
}

export {SideBar};