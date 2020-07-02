import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pathfinder from './Pathfinder/Pathfinder';
import * as serviceWorker from './serviceWorker';
import Header from './Header/Header';
import { calculateStraightLine } from './utils/Utils';

ReactDOM.render(
  <React.StrictMode>
    {/* { console.log(calculateStraightLine([2,1], [2,5])) } */}
    <Header />
    <Pathfinder />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
