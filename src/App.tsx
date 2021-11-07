import React from 'react';
import './App.css';
import {Editor} from "./components/Editor/Editor";
import {Player} from "./components/Player/Player";
import {editorModeType, EditorType} from "./dataModel/editorDataModel";

type AppProps = {
  editor: EditorType,
}

function isEditMode(mode: editorModeType): boolean {
    return mode === 'edit'
}

function isPlayerMode(mode: editorModeType): boolean {
    return mode === 'view'
}


function App({editor}: AppProps) {
  return (
    <div className="App">
        {isEditMode(editor.mode) && <Editor />}
        {isPlayerMode(editor.mode) && <Player />}
    </div>
  );
}


export default App;
