import React from 'react';
import s from './FigureInsertButtons.module.css';
import {RectangleInsertButton} from "./RectangleInsertButton/RectangleInsertButton";
import {CircleInsertButton} from "./CircleInsertButton/CircleInsertButton";
import {TriangleInsertButton} from "./TriangleInsertButton/TriangleInsertButton";

function FigureInsertButtons() {
    return (
        <div className={s.insertToolbar}>
            <div className={s.insertButtons}>
                <RectangleInsertButton />
                <CircleInsertButton />
                <TriangleInsertButton />
            </div>
            <div className={s.buttonText}>FIGURE</div>
        </div>
    );
}

export {FigureInsertButtons};