import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import Store from './src/Redux/Store';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';

const ReduxWrap = () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxWrap);
