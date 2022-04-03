import {useState, createContext} from 'react';
import './App.css';
import Categorylist from './components/Categorylist';
import Nav from './components/Nav';

export const DataContext = createContext();

function App() {
  let locationID;
  let locationName;
  const location = window.location.pathname.substring(1);
  const [breadcrumbs, setBreadCrumbs] = useState([{name: "Home", link: "/"}]);

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
    location: location,
    locationID: locationID,
    locationName: locationName,
    breadcrumbs: breadcrumbs
  }

  return (
    <div className="App">
      <DataContext.Provider value={userData}>
        <header>
          <div>{locationName} Life</div>
          <Nav />
        </header>
        <Categorylist taxonid="1" />
      </DataContext.Provider>
    </div>
  );
}

export default App;
