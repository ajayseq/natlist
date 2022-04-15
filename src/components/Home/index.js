import {useState, createContext} from 'react';
import Categorylist from '../Categorylist';
import Specieslist from '../Specieslist';
import Obslist from '../Obslist';
import Nav from '../Nav';
import { Link, useParams } from 'react-router-dom';

export const DataContext = createContext();

function Home(props) {

  let {id} = useParams();
  id = (id === (null || undefined) ? 1: id);

  const [breadcrumbs, setBreadCrumbs] = useState([{name: "Home", link: ""}]);
  const [level, setLevel] = useState('');

  const userData = {
    location: props.location,
    locationID: props.locationID,
    locationName: props.locationName,
    breadcrumbs: breadcrumbs,
    setBreadCrumbs: setBreadCrumbs,
    setTaxonID: props.setTaxonID,
    level: level
  }

  let list;
  if (props.species == "true") {
    if (level != "species")
      setLevel("species");
    list = <Specieslist taxonid={props.taxonid} />;
    console.log("Home going to specieslist");
  } else if (props.obs == "true") {
    if (level != "obs")
      setLevel("obs");
    console.log('Home level: ', level);
    list = <Obslist taxonid={props.taxonid} />;
    console.log("Home going to obslist");
  } else {
    if (level != "category")
      setLevel("category");
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
