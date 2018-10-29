import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'

const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)


ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
