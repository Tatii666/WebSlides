import React, {useEffect, useState} from 'react';
import s from './FileTitle.module.css';
import {dispatchType, stateType} from "../../../../../store/store";
import {connect} from "react-redux";
import {setPresentationTitleAC} from "../../../../../store/presentationReducer";

type propsType = {
    title: string,
    setPresentationTitle: Function,
}

/**
 * @param {{
 *   title: string,
 *   setPresentationTitle: Function,
 * }} props
 */
function FileTitle({title, setPresentationTitle}: propsType) {
    const [newTitle, setTitle] = useState(title);

    useEffect(() => {
        setTitle(title);
    }, [title])

    return (
        <div className={s.fileTitle}>
            <input type="text"
                   value={newTitle}
                   className={s.fileTitleInput}
                   onChange={(event)=>setTitle(event.target.value)}
                   onBlur={() => {
                       if (newTitle.trim() !== '') {
                           setPresentationTitle(newTitle.trim())
                           setTitle(newTitle.trim())
                       } else {
                           setTitle(title)
                       }
                   }}
            />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {
        title: state.model.editor.presentation.title,
    }
}
const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        setPresentationTitle: (newTitle: string) => dispatch(setPresentationTitleAC(newTitle)),
    }
}

const FileTitleContainer = connect(mapStateToProps, mapDispatchToProps)(FileTitle);


export {FileTitleContainer};