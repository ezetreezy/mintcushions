//primary REDUX startup js file (ROOT FILE on frontend)
//index.js must be our  root because it is forced by create-react-app

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
window.axios = axios;

//new instance of our redux store(reducers,
//initial state of our app(server side rendering,
//middleware in our app))
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root'));

//Provider ->
//React component provided by the react-redux library(react + redux work together)
//bonding layer or glue or react-redux
//pass our store to the provider as a prop

//Redux Store ->
//Where Our State Exists, consists of our combined reducers(authReducer, etcc)
//Action creator -> action -> reducers -> store -> updates Provider/React

//App -> Parent React Component
//First child of our provider class component
//Component heiarchy can access our global state reaches through our global store
