import {useState, createContext} from 'react';
import Categorylist from '../Categorylist';
import Specieslist from '../Specieslist';
import Nav from '../Nav';
import { Link, useParams } from 'react-router-dom';

export const DataContext = createContext();

function Home(props) {

  let {id} = useParams();
  id = (id === (null || undefined) ? 1: id);

  const [breadcrumbs, setBreadCrumbs] = useState([{name: "Home", link: "/"}]);

  const userData = {
    location: props.location,
    locationID: props.locationID,
    locationName: props.locationName,
    breadcrumbs: breadcrumbs,
    setTaxonID: props.setTaxonID,
  }

  let list;
  if (props.species == "true") {
    list = <Specieslist taxonid={props.taxonid} />;
    console.log("Home going to specieslist");
  } else {
    list = <Categorylist taxonid={props.taxonid} />;
    console.log("Home going to categorylist");
  }

  console.log("Home taxonid is ", props.taxonid, id);

  //() => setTaxonID((id === (null || undefined)) ? 1: id);

  return (
    <div className="App">
        <DataContext.Provider value={userData}>
          <header>
            <div>{userData.locationName} Life</div>
            <Nav />
          </header>
          {list}
        </DataContext.Provider>
    </div>
  );
}

export default Home;
