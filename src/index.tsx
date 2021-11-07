import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {addEditorChangeHandler, getEditor} from "./editor.js";

function render() {
    ReactDOM.render(
        <React.StrictMode>
            <App editor={getEditor()}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

addEditorChangeHandler(render);
render();

reportWebVitals();
