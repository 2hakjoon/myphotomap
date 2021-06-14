import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { connectDB, FB_dbTest } from './firebase/fieBaseDB';
import { connectAuth, FB_login, getEmail } from './firebase/fireBaseAuth';
import { fireBaseInit } from './firebase/fireBaseInit';
import GlobalStyle from './GlobalStyle';

fireBaseInit();



ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle/>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);
