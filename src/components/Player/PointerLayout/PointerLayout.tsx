import React from 'react';
import s from './PointerLayout.module.css';
import {pointType} from "../../../dataModel/editorDataModel";

type propsType = {
    pointerPositions: Array<pointType>,
    playerWindowRef: React.RefObject<HTMLDivElement>
}

function PointerLayout({pointerPositions, playerWindowRef}: propsType) {
    if (!playerWindowRef.current) {
        return null
    }
    let path: string = '';
    for(let i = pointerPositions.length - 1; i > 0; i--) {
        if (i === pointerPositions.length - 1) {
            path = path + ` M ${pointerPositions[i].x} ${pointerPositions[i].y} `
        } else {
            path = path + ` L ${pointerPositions[i].x} ${pointerPositions[i].y} `
        }
    }

    return (
        <svg id='pointerLayout'
            className={`${s.pointerLayout}`}
            width={playerWindowRef.current.clientWidth}
            height={playerWindowRef.current.clientHeight}
            viewBox={`0 0 ${playerWindowRef.current.clientWidth} ${playerWindowRef.current.clientHeight}`}
            style={{
                cursor: 'none',
            }}
        >
            <path
                d={path} stroke={'red'}
                strokeWidth={8}
                fill={'transparent'}
                style={{
                    strokeLinejoin: 'round',
                    strokeLinecap: 'round',
                    filter: `drop-shadow( 0 0 3px rgba(255, 0, 0, 1))`,
                }}
            />
        </svg>
    );
}

export {PointerLayout};