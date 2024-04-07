import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Viz from './Viz';
import Categorization from './Categorization';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './Routes';


ReactDOM.render(
  <Router>
    <Routes />
  </Router>, document.getElementById('root'));


serviceWorker.unregister();
