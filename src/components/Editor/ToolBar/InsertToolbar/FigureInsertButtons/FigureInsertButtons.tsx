import React from 'react';
import s from './FigureInsertButtons.module.css';
import {FigureButtons} from "./FigureButtons/FigureButtons";
import {ReactComponent as CircleIcon} from "../../../../../img/addCircle2.svg";
import {ReactComponent as RectangleIcon} from "../../../../../img/addRectangle2.svg";
import {ReactComponent as TriangleIcon} from "../../../../../img/addTriangle2.svg";
function FigureInsertButtons() {
    return (
        <div className={s.figureInsertButtons}>
            <div className={s.insertButtons}>
                <FigureButtons icon={RectangleIcon} text={'rectangle'} onClick={() => {}}/>
                <FigureButtons icon={CircleIcon} text={'circle'} onClick={() => {}}/>
                <FigureButtons icon={TriangleIcon} text={'triangle'} onClick={() => {}}/>
            </div>
            <div className={s.buttonText}>FIGURE</div>
        </div>
    );
}

export {FigureInsertButtons};