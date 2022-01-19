import React from 'react';
import s from './RedoButton.module.css';
import commonStyle from '../../../../common/common.module.css';
import {ReactComponent as RedoIcon} from '../../../../../../img/Redo2.svg'

type propsType = {
    isDisabled: boolean,
    doRedo: Function,
}

function RedoButton({isDisabled, doRedo}: propsType) {
    function onRedoClick() {
        doRedo();
    }

    return (
        <div className={`${commonStyle.standardButtonIcon} ${commonStyle.standardButtonHover} ${s.redoButton}  ${isDisabled? s.redoButton_disabled: ''}`}
             onClick={!isDisabled ? onRedoClick : () => {}}>
            <RedoIcon />
        </div>
    );
}

export {RedoButton};