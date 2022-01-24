import React from 'react';
import s from './ToolBar.module.css';
import {FileToolbarContainer} from "./FileToolbar/FileToolbar";
import {SlideToolbarContainer} from "./SlideToolbar/SlideToolbar";
import {InsertToolbarContainer} from "./InsertToolbar/InsertToolbar";
import {FontToolbar} from "./FontToolbar/FontToolbar";
import {ColorToolbarContainer} from "./ColorToolbar/ColorToolbar";
import {PresentationToolbarContainer} from "./PresentationToolbar/PresentationToolbar";
import {connect} from "react-redux";
import {dispatchType, stateType} from "../../../store/store";

type propsType = {
}

function ToolBar({}: propsType) {
    return (
        <div className={s.toolbar}>
            <FileToolbarContainer />
            <SlideToolbarContainer />
            <InsertToolbarContainer />
            <FontToolbar/>
            <ColorToolbarContainer />
            <PresentationToolbarContainer />
        </div>
    );
}

const mapStateToProps = (state: stateType) => {
    return {}
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {}
}


const ToolBarContainer = connect(mapStateToProps, mapDispatchToProps)(ToolBar);

export {ToolBarContainer};