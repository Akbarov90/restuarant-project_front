import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './store/store'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from "react-hot-toast";

ReactDOM.render(
    <>
        <BrowserRouter>
            <Provider store={store}>
                <Toaster position="top-center"/>
                <App />
            </Provider>
        </BrowserRouter>
    </>,
    document.getElementById('root')
);

