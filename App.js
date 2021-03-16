import React from 'react';
import Main from './src/components/Main'
import {Provider} from 'react-redux'
import configureStore from './src/reducers/store'

const store = configureStore();



function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App