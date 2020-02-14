import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-tabs/style/react-tabs.css';
import './index.css';
import App from './App';
import "react-toastify/dist/ReactToastify.css";
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './Store';
document.documentElement.setAttribute('data-theme', localStorage.getItem("theme-color"));
ReactDOM.render(<StoreProvider><BrowserRouter><App /></BrowserRouter></StoreProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
