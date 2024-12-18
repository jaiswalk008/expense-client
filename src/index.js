import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
// import { AuthContextProvider } from './Components/Context/AuthContextProvider';
// import { ExpenseContextProvider } from './Components/Context/ExpenseContextProvider';
import { store } from './Components/Context/store';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';
LogRocket.init('tkqgyc/expense-tracker');
LogRocket.identify('user-name', {
  name: localStorage.getItem('user-name'),
   });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}><App/>
 </Provider></BrowserRouter>
   
   
  </React.StrictMode>
);