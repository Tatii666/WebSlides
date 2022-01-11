import React from 'react';
import s from './FigureInsertButtons.module.css';
import {FigureButtons} from "./FigureButtons/FigureButtons";
import {ReactComponent as CircleIcon} from "../../../../../img/addCircle2.svg";
import {ReactComponent as RectangleIcon} from "../../../../../img/addRectangle2.svg";
import {ReactComponent as TriangleIcon} from "../../../../../img/addTriangle2.svg";

type propsType = {
    addFigure: Function;
}

function FigureInsertButtons({addFigure}: propsType) {
    return (
        <div className={s.figureInsertButtons}>
            <div className={s.insertButtons}>
                <FigureButtons icon={CircleIcon} text={'circle'} onClick={() => addFigure('c')}/>
                <FigureButtons icon={TriangleIcon} text={'triangle'} onClick={() => addFigure('t')}/>
                <FigureButtons icon={RectangleIcon} text={'rectangle'} onClick={() => addFigure('r')}/>
            </div>
            <div className={s.buttonText}>FIGURE</div>
        </div>
    );
}

export {FigureInsertButtons};