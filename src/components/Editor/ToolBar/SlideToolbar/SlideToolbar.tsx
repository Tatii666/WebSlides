import React from 'react';
import s from './SlideToolbar.module.css';
import {NewSlideButton} from "./NewSlideButton/NewSlideButton";
import {connect} from "react-redux";
import {dispatchType, stateType} from "../../../../store/store";
import {
    addNewSlideAC,
} from "../../../../store/presentationReducer";


type propsType = {
    addNewSlide: () => void,
}

function SlideToolbar({addNewSlide}: propsType) {
    return (
        <div className={s.slideToolbar}>
            <NewSlideButton addNewSlide={addNewSlide}/>
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {}
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        addNewSlide: () => dispatch(addNewSlideAC()),
    }
}


const SlideToolbarContainer = connect(mapStateToProps, mapDispatchToProps)(SlideToolbar);

export {SlideToolbarContainer};