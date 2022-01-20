import React from 'react';
import {useState} from "react";

function useDownUp(action: Function) {
    const [isDown, setIsDown] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [delta, setDelta] = useState({x: 0, y: 0});

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        const {pageX: x, pageY: y} = event;
        setIsDown(true);
        setPosition({x, y});
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
        if(!isDown) {
            return;
        }

        const {pageX: x, pageY: y} = event;
        let deltaX = x - position.x;
        let deltaY = y - position.y;
        setIsDown(false);
        setDelta({
            x: deltaX,
            y: deltaY,
        })
        action(delta);
        setDelta({
            x: 0,
            y: 0,
        });
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if(!isDown) {
            return;
        }

        const {pageX: x, pageY: y} = event
        let deltaX = x - position.x;
        let deltaY = y - position.y;
        setDelta({
            x: deltaX,
            y: deltaY,
        });
    }

    return {
        delta,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
    };
}

export {useDownUp}