import {useState, createContext} from 'react';
import './App.css';
import { Route, Link, Redirect } from 'react-router-dom';
import Categorylist from './components/Categorylist';

export const DataContext = createContext();

function App() {
  let locationID = 27;
  let locationName = "Community Garden";
  const location = window.location.pathname.substring(1);

  switch (location) {
    case "garden":
      locationID = 27;
      locationName = "Community Garden";
    break;
    default:
      locationID = 27;
      locationName = "Community Garden";
  }

  return (
    <div className="App">
      <header>
        <div>{locationName} Life</div>
        <div>Nav</div>
      </header>
      <Categorylist taxonid="1" />
    </div>
  );
}

export default App;
