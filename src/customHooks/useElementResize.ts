import React from 'react';
import {useState} from "react";
import {useDownUp} from "./useDownUp";
import {pointType} from "../dataModel/editorDataModel";

export type resizeDeltaType = {x: number, y: number, width: number, height: number};

function useElementResize(action: Function) {
    const [resizeMode, setResizeMode] = useState(0);
    const [initalSize, setInitalSize] = useState({width: 0, height: 0});
    const [resizeDelta, setResizeDelta] = useState({x: 0, y: 0, width: 0, height: 0});
    const {delta, handleMouseDown, handleMouseUp, handleMouseMove} = useDownUp(({x, y}: pointType) => {
        calculateDelta(resizeMode, x, y, initalSize.width, initalSize.height);
        action(resizeDelta);
    } );
    const handleMouseDownResize = (e: React.MouseEvent<HTMLDivElement>, width: number, height: number) => {
        const target: HTMLDivElement = e.target as HTMLDivElement;
        handleMouseDown(e);

        setResizeMode(+(target.getAttribute('data-resize-point') || '0'));
        setInitalSize({width, height});
    }
    const handleMouseUpResize = (e: React.MouseEvent<HTMLDivElement>) => {
        if(!resizeMode) {
            return;
        }
        handleMouseUp(e);

        setResizeDelta({x: 0, y: 0, width: 0, height: 0});
        setResizeMode(0);
    }
    const handleMouseMoveResize = (e: React.MouseEvent<HTMLDivElement>) => {
        handleMouseMove(e);
        setResizeDelta(calculateDelta(resizeMode, delta.x, delta.y, initalSize.width, initalSize.height));
    }

    return {
        resizeDelta,
        handleMouseDownResize,
        handleMouseUpResize,
        handleMouseMoveResize,
    };
}

function calculateDelta(mode: number, dx: number, dy: number, initalWidth: number, initalHeight: number) {
    let deltaX = 0;
    let deltaY = 0;
    let deltaWidth = 0;
    let deltaHeight = 0;
    const ratioX = dx / initalWidth;

    switch (mode) {
        case 2: //t
            deltaY = dy;
            deltaHeight = -dy;
            break;
        case 4: //r
            deltaWidth = dx;
            break;
        case 6: //b
            deltaHeight = dy;
            break;
        case 8: //l
            deltaX = dx;
            deltaWidth = -dx;
            break;
        case 1: //lt
            deltaX = ratioX * initalWidth;
            deltaY = ratioX * initalHeight;
            deltaWidth = -ratioX * initalWidth;
            deltaHeight = -ratioX * initalHeight;
            break;
        case 3: //rt
            deltaY = -ratioX * initalHeight;
            deltaWidth = ratioX * initalWidth;
            deltaHeight = ratioX * initalHeight;
            break;
        case 5: //rb
            deltaWidth = ratioX * initalWidth;
            deltaHeight = ratioX * initalHeight;
            break;
        case 7: //lb
            deltaX = ratioX * initalWidth;
            deltaWidth = -ratioX * initalWidth;
            deltaHeight = -ratioX * initalHeight;
            break;
    }

    return {
        x: initalWidth - deltaX < 1 ? initalWidth : deltaX,
        y: initalHeight - deltaY < 1 ? initalHeight : deltaY,
        width: initalWidth + deltaWidth > 1 ? deltaWidth : -initalWidth + 1,
        height: initalHeight + deltaHeight > 1 ? deltaHeight : -initalHeight + 1,
    };
}

export {useElementResize}