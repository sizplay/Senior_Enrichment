import React from 'react';
import { render } from 'react-dom';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './store';

const root = document.getElementById('root');

render((
  <Provider store={store}>
    <Home />
  </Provider>
), root);

