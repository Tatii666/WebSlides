import React from 'react';
import './App.css';
import {Editor} from "./components/Editor/Editor";
import {Player} from "./components/Player/Player";
import {editorModeType, EditorType} from "./dataModel/editorDataModel";
import {getEditor} from "./editor";

type AppPropsType = {
  editor: EditorType,
}

function isEditMode(mode: editorModeType): boolean {
    return mode === 'edit'
}

function isPlayerMode(mode: editorModeType): boolean {
    return mode === 'view'
}


function App({editor}: AppPropsType) {
  return (
    <div className="App">
        {isEditMode(editor.mode) && <Editor />}
        {isPlayerMode(editor.mode) && <Player editor={getEditor()}/>}
    </div>
  );
}


export default App;
