import React from 'react';
import './App.css';
import {Editor} from "./components/Editor/Editor";
import {Player} from "./components/Player/Player";

/**
 * @type {('view'|'edit')}
 */
let mode = 'edit';

function isEditMode(): boolean {
    return mode === 'edit'
}

function isPlayerMode(): boolean {
    return mode === 'view'
}

function App() {
  return (
    <div className="App">
        {isEditMode() && <Editor />}
        {isPlayerMode() && <Player />}
    </div>
  );
}


export default App;
