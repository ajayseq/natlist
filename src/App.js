import {useState, createContext} from 'react';
import './App.css';
import { Route, Link, Redirect } from 'react-router-dom';
import Categorylist from './components/Categorylist';

export const DataContext = createContext();

function App() {
  let locationID;
  let locationName;
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

  const userData = {
    locationID: locationID,
    locationName: locationName
  }

  return (
    <div className="App">
      <header>
        <div>{locationName} Life</div>
        <div>Nav</div>
      </header>
      <DataContext.Provider value={userData}>
        <Categorylist taxonid="1" />
      </DataContext.Provider>
    </div>
  );
}

export default App;
