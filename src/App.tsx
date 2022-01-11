import React from 'react';
import './App.css';
import {Editor} from "./components/Editor/Editor";
import {PlayerContainer} from "./components/Player/Player";
import {editorModeType, EditorType} from "./dataModel/editorDataModel";
import {connect} from "react-redux";
import {stateType} from "./store/store";

type AppPropsType = {
    mode: editorModeType,
}

function isEditMode(mode: editorModeType): boolean {
    return mode === 'edit'
}

function isPlayerMode(mode: editorModeType): boolean {
    return mode === 'view'
}

function App({mode}: AppPropsType) {
  return (
    <div className="App">
        {isEditMode(mode) && <Editor />}
        {isPlayerMode(mode) && <PlayerContainer />}
    </div>
  );
}

const mapStateToProps = (state: stateType) => {
    return {
        mode: state.model.mode,
    }
}

const AppContainer = connect(mapStateToProps)(App)
export default AppContainer;
