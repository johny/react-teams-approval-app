import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';

import App from './app/App'
import store from './app/store'

const render = () => {
  const root = document.getElementById('root')
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>, root);
}

render()
