import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {store} from "./store/store";
import AppContainer from "./App";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
