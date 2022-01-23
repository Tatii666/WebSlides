import React, {useRef, useState} from 'react';
import s from './Player.module.css';
import {PlayerPopup} from "./PlayerPopup/PlayerPopup";
import {pointType, PresentationType} from "../../dataModel/editorDataModel";
import {SlideContent} from "../Editor/EditorArea/SlideContent/SlideContent";
import {useRatioResize} from "../../customHooks/useRatioResize";
import {dispatchType, stateType} from "../../store/store";
import {setEditorModeAC} from "../../store/modeReducer";
import {connect} from "react-redux";
import {setFirstSlideActiveAC, setNextSlideActiveAC, setPrevSlideActiveAC} from "../../store/presentationReducer";
import {PointerLayout} from "./PointerLayout/PointerLayout";

const POINTER_DURATION = 200; //ms

type PlayerPropsType = {
    presentation: PresentationType,
    setFirstSlideActive: Function,
    setNextSlideActive: Function,
    setPrevSlideActive: Function,
    setEditorMode: Function,
}

function Player({presentation, setFirstSlideActive, setNextSlideActive, setPrevSlideActive, setEditorMode}: PlayerPropsType) {
    const [statePointer, setStatePointer] = useState(false);
    const [pointerPositions, setPointerPositions] = useState<Array<pointType>>([]);
    const pointerPositionsRef = useRef(pointerPositions);
    pointerPositionsRef.current = pointerPositions;
    const playerRef = useRef<HTMLDivElement>(null);
    const {width, height, scaleKoef} = useRatioResize(playerRef);
    const activeSlideId = presentation.activeSlide;

    if (!activeSlideId) {
        setFirstSlideActive();
    }

    function handleMouseMove (e: React.MouseEvent<HTMLDivElement, MouseEvent>, positionsRef: React.MutableRefObject<pointType[]>) {
        if (statePointer) {
            const newPositionsArray = positionsRef.current.map(p => p);
            newPositionsArray.push({
                x: e.pageX,
                y: e.pageY,
            })
            setPointerPositions(newPositionsArray);

            setTimeout(() => {
                const newPositionsArray = positionsRef.current.map(p => p);
                newPositionsArray.shift()
                setPointerPositions(newPositionsArray);
            }, POINTER_DURATION);
        }
    }

    function handleMouseWheel(e: React.WheelEvent<HTMLDivElement>) {
        if (e.ctrlKey) {
            return
        }
        if (e.deltaY > 0) {
            setNextSlideActive();
        }
        if (e.deltaY < 0) {
            setPrevSlideActive();
        }
    }

    return (
        <div className={s.player} ref={playerRef}
            onClick={e => setNextSlideActive()}
            onMouseMove={(e) => handleMouseMove(e, pointerPositionsRef)}
            onWheel={handleMouseWheel}
        >
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
                    scaleTransformValue={scaleKoef}
                />
            </div>
            {statePointer && <PointerLayout pointerPositions={pointerPositions} playerWindowRef={playerRef}/> }
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