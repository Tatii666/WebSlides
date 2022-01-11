import React from 'react';
import s from './DeleteButton.module.css';
import {idType} from "../../../../../dataModel/editorDataModel";

type propsType = {
    slideId: idType,
    deleteSlide: Function,
}

function DeleteButton({slideId, deleteSlide}: propsType) {
    return (
        <div className={s.DeleteButton}
             onClick={(event) => {
                 deleteSlide(slideId);
                 event.preventDefault()
             }}
        >
            X
        </div>
    );
}


export {DeleteButton};