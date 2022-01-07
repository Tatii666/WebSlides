import React from 'react';
import './App.css';
import {Editor} from "./components/Editor/Editor";
import {Player} from "./components/Player/Player";
import {editorModeType, EditorType} from "./dataModel/editorDataModel";

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
        {isEditMode(editor.mode) && <Editor editor={editor} />}
        {isPlayerMode(editor.mode) && <Player editor={editor} />}
    </div>
  );
}


export default App;
