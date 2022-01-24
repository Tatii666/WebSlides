import React, {ChangeEvent, useRef, useState} from 'react';
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
    changeSlideBackgroundImageAC,
    deleteSlideAC,
    moveSlideInOrdersAC,
    selectSlideAC,
    selectSlidePropsType,
} from "../../../store/presentationReducer";
import {IMAGE_FILE_EXTENTION} from "../ToolBar/InsertToolbar/InsertToolbar";

type propsType = {
    slides: slidesType,
    slidesOrder: slidesOrderType,
    selection: selectionType,
    activeSlide: idType,
    selectSlide: Function,
    deleteSlide: Function,
    moveSlide: Function,
    changeSlideBackgroundImage: Function,
}

function SideBar({slides, slidesOrder, selection, activeSlide, selectSlide, deleteSlide, moveSlide, changeSlideBackgroundImage}: propsType) {
    const selectedSlides = getSelectedSlides(selection);
    const [newBgSlideId, setNewBgSlideId] = useState<string>('')
    const inputFile = useRef<HTMLInputElement>(null);
    const readFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = function() {
            if (typeof reader.result === 'string') {
                const image = new Image();
                image.onload = function(){
                    changeSlideBackgroundImage(newBgSlideId, reader.result);
                };
                image.src = reader.result
            }
        };
        reader.onerror = function() {
            console.error(reader.error);
            setNewBgSlideId('')
        };
        reader.readAsDataURL(file);
    }
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        if (files && files.length) {
            const filename = files[0].name;

            const parts = filename.split(".");
            const fileType = parts[parts.length - 1].toLowerCase();
            if (!IMAGE_FILE_EXTENTION.includes(fileType)) {
                console.error("Incorrect image file!");
                setNewBgSlideId('')
                return
            }
            readFile(files[0]);

        }
        if (inputFile.current) {
            inputFile.current.value = '';
        }
    };

    const onLoadImageClick = (id: idType) => {
        setNewBgSlideId(id);
        inputFile.current && inputFile.current.click();
    }
    const onLoadImageClickRef = useRef(onLoadImageClick)

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
                    changeSlideBackgroundImage={changeSlideBackgroundImage}
                    onLoadImageClickRef={onLoadImageClickRef}
                />
            })}
            <input
                style={{ display: "none" }}
                accept={`${IMAGE_FILE_EXTENTION.reduce((acc, el) => acc + `.${el},`, '')}`}
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
            />
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
        changeSlideBackgroundImage: (slideId: idType, image?: string) => dispatch(changeSlideBackgroundImageAC(slideId, image)),
    }
}

const SideBarContainer = connect(mapStateToProps, mapDispatchToProps)(SideBar);

export {SideBarContainer};