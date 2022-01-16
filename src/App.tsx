import React from 'react';
import './App.css';
import {Editor} from "./components/Editor/Editor";
import {PlayerContainer} from "./components/Player/Player";
import {editorModeType, EditorType} from "./dataModel/editorDataModel";
import {connect} from "react-redux";
import {dispatchType, stateType} from "./store/store";
import {keyboardHandler} from "./handler/keyboardHandler";

type AppPropsType = {
    mode: editorModeType,
    dispatch: dispatchType,
    state: stateType,
}

function isEditMode(mode: editorModeType): boolean {
    return mode === 'edit'
}

function isPlayerMode(mode: editorModeType): boolean {
    return mode === 'view'
}

function App({mode, dispatch, state}: AppPropsType) {
  return (
    <div className="App"
        onKeyDown={(e) => {
            keyboardHandler(e, dispatch, state);
        }}
        tabIndex={0}
    >
        {isEditMode(mode) && <Editor />}
        {isPlayerMode(mode) && <PlayerContainer />}
    </div>
  );
}

const mapStateToProps = (state: stateType) => {
    return {
        mode: state.model.mode,
        state: state,
    }
}

const mapDispatchToProps = (dispatch: dispatchType) => {
    return {
        dispatch: dispatch,
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
export default AppContainer;
