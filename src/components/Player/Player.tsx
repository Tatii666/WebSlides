import React, {useRef, useState} from 'react';
import s from './Player.module.css';
import {PlayerPopup} from "./PlayerPopup/PlayerPopup";
import {PresentationType} from "../../dataModel/editorDataModel";
import {SlideContent} from "../Editor/EditorArea/SlideContent/SlideContent";
import {useRatioResize} from "../../customHooks/useRatioResize";
import {dispatchType, stateType} from "../../store/store";
import {setEditorModeAC} from "../../store/modeReducer";
import {connect} from "react-redux";
import {setFirstSlideActiveAC, setNextSlideActiveAC, setPrevSlideActiveAC} from "../../store/presentationReducer";

type PlayerPropsType = {
    presentation: PresentationType,
    setFirstSlideActive: Function,
    setNextSlideActive: Function,
    setPrevSlideActive: Function,
    setEditorMode: Function,
}

function Player({presentation, setFirstSlideActive, setNextSlideActive, setPrevSlideActive, setEditorMode}: PlayerPropsType) {
    const [statePointer, setStatePointer] = useState(false);
    const player = useRef<HTMLDivElement>(null);
    const {width, height, scaleKoef} = useRatioResize(player);
    const activeSlideId = presentation.activeSlide;

    if (!activeSlideId) {
        setFirstSlideActive();
    }

    return (
        <div className={s.player} ref={player}>
            <div
                className={s.slideContainer}
                style={{
                    width: `${width}px`,
                    height: `${height}px`,
                }}
            >
                <SlideContent
                    isEditor={false}
                    slide={presentation.slides[activeSlideId]}
                    selectedElements={[]}
                    scaleTransformValue={scaleKoef}
                />
            </div>
            <PlayerPopup
                pointer={{statePointer, setStatePointer}}
                setNextSlideActive={setNextSlideActive}
                setPrevSlideActive={setPrevSlideActive}
                setEditorMode={setEditorMode}
            />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        presentation: state.model.editor.presentation,
    }
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        setEditorMode: () => dispatch(setEditorModeAC()),
        setFirstSlideActive: () => dispatch(setFirstSlideActiveAC()),
        setNextSlideActive: () => dispatch(setNextSlideActiveAC()),
        setPrevSlideActive: () => dispatch(setPrevSlideActiveAC()),
    }
}

const PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);


export {PlayerContainer};