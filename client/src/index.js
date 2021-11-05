import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
let id;
(function checkAuth() {
  axios.get('/api/logins/checkAuth').then((results) => {
    id = results.data.id;
    console.log(id);
    return Promise.resolve(id).then((id) => id);
  }).then((id) => {
    console.log('id in render', id);
    ReactDOM.render(
      <React.StrictMode>
        <App id={id}/>
      </React.StrictMode>,
      document.getElementById('root')
    );
  })
}());

// ReactDOM.render(
//   <React.StrictMode>
//     <App id={id}/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
