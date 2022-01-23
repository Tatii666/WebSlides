import React from 'react';
import s from './SideBar.module.css';
import {SlideItem} from "./SlideItem/SlideItem";
import {
    getSelectedSlides,
    idType,
    selectionType,
    slidesOrderType,
    slidesType,
} from "../../../dataModel/editorDataModel";
import {connect} from "react-redux";
import {dispatchType, stateType} from "../../../store/store";
import {
    deleteSlideAC,
    moveSlideInOrdersAC,
    selectSlideAC,
    selectSlidePropsType,
} from "../../../store/presentationReducer";

type propsType = {
    slides: slidesType,
    slidesOrder: slidesOrderType,
    selection: selectionType,
    activeSlide: idType,
    selectSlide: Function,
    deleteSlide: Function,
    moveSlide: Function,
}

function SideBar({slides, slidesOrder, selection, activeSlide, selectSlide, deleteSlide, moveSlide}: propsType) {
    const selectedSlides = getSelectedSlides(selection)
    return (
        <div className={s.sidebar}>
            {slidesOrder.map((slideId, index: number) => {
                return <SlideItem
                    slide={slides[slideId]}
                    isSelected={selectedSlides.findIndex((el) => el === slideId) !== -1}
                    isActive={slideId === activeSlide}
                    key={index}
                    index={index}
                    selectSlide={selectSlide}
                    deleteSlide={deleteSlide}
                    moveSlide={moveSlide}
                />
            })}
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        slides: state.model.editor.presentation.slides,
        slidesOrder: state.model.editor.presentation.slidesOrder,
        selection: state.model.editor.presentation.selection,
        activeSlide: state.model.editor.presentation.activeSlide,
    }
}
const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        selectSlide: ({slideId, isCtrlPressed}: selectSlidePropsType) => dispatch(selectSlideAC({slideId, isCtrlPressed})),
        deleteSlide: (slideId: idType) => dispatch(deleteSlideAC(slideId)),
        moveSlide: (slideId: idType, toWhere: 'next'|'prev') => dispatch(moveSlideInOrdersAC(slideId, toWhere)),
    }
}

const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar);

export {SideBarContainer};