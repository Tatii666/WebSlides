import React from 'react';
import s from './SideBar.module.css';
import {SlideItem} from "./SlideItem/SlideItem";
import {
    idType,
    selectedSlidesType,
    slidesOrderItemType,
    slidesOrderType,
    slidesType,
} from "../../../dataModel/editorDataModel";

type propsType = {
    slides: slidesType,
    slidesOrder: slidesOrderType,
    selectedSlides: selectedSlidesType,
    activeSlide: idType,
}

function SideBar({slides, slidesOrder, selectedSlides, activeSlide}: propsType) {
    return (
        <div className={s.sidebar}>
            {slidesOrder.map((slide: slidesOrderItemType, index: number) => {
                return <SlideItem
                    slide={slides[slide.id]}
                    isSelected={selectedSlides.findIndex((el) => el.id === slide.id) !== -1}
                    isActive={slide.id === activeSlide}
                    key={index}
                    index={index}
                />
            })}
        </div>
    );
}

export {SideBar};