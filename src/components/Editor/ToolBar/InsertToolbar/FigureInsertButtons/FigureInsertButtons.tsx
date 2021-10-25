import React from 'react';
import s from './FigureInsertButtons.module.css';
import {FigureButtons} from "./FigureButtons/FigureButtons";
import CircleIcon from "../../../../../img/addCircle.png";
import RectangleIcon from "../../../../../img/addRectangle.png";
import TriangleIcon from "../../../../../img/addTriangle.png";

function FigureInsertButtons() {
    return (
        <div className={s.figureInsertButtons}>
            <div className={s.insertButtons}>
                <FigureButtons iconSrc={RectangleIcon}/>
                <FigureButtons iconSrc={CircleIcon}/>
                <FigureButtons iconSrc={TriangleIcon}/>
            </div>
            <div className={s.buttonText}>FIGURE</div>
        </div>
    );
}

export {FigureInsertButtons};