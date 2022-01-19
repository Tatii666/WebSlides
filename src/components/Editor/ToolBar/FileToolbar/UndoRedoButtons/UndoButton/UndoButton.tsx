import React from 'react';
import s from './UndoButton.module.css';
import commonStyle from '../../../../common/common.module.css';
import {ReactComponent as UndoIcon} from '../../../../../../img/Undo2.svg'

type propsType = {
    isDisabled: boolean,
    doUndo: Function,
}

function UndoButton({isDisabled, doUndo}: propsType) {
    function onUndoClick() {
        doUndo();
    }

    return (
        <div className={`${commonStyle.standardButtonIcon} ${commonStyle.standardButtonHover} ${s.undoButton} ${isDisabled? s.undoButton_disabled: ''}`}
             onClick={!isDisabled ? onUndoClick : () => {}}>
            <UndoIcon />
        </div>
    );
}

export {UndoButton};