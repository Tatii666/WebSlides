import React from 'react';
import s from "./ResizeComponent.module.css";

type resizePropsType = {
    onResizeStart?: Function,
    width: number,
    height: number,
}
function ResizeComponent({onResizeStart, width, height}: resizePropsType) {
    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (onResizeStart) {
            onResizeStart(e, width, height);
            e.stopPropagation();
        }
    }

    return <div className={`${s.resizeWrapper}`}>
        <div className={`${s.resizePointer} ${s.resizePointer_TopLeft}`} onMouseDown={onMouseDown} data-resize-point={1}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_TopMiddle}`} onMouseDown={onMouseDown} data-resize-point={2}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_TopRight}`} onMouseDown={onMouseDown} data-resize-point={3}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_RightMiddle}`} onMouseDown={onMouseDown} data-resize-point={4}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_BottomRight}`} onMouseDown={onMouseDown} data-resize-point={5}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_BottomMiddle}`} onMouseDown={onMouseDown} data-resize-point={6}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_BottomLeft}`} onMouseDown={onMouseDown} data-resize-point={7}></div>
        <div className={`${s.resizePointer} ${s.resizePointer_LeftMiddle}`} onMouseDown={onMouseDown} data-resize-point={8}></div>
    </div>
}

export {ResizeComponent}