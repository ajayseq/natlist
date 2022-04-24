import {useState, createContext} from 'react';
import Categorylist from '../Categorylist';
import Specieslist from '../Specieslist';
import Obslist from '../Obslist';
import Nav from '../Nav';
import { Link, useParams } from 'react-router-dom';
import leaf_left from './leaf_left.png';
import leaf_right from './leaf_right.png';

export const DataContext = createContext();

function Home(props) {

  let {id} = useParams();
  id = (id === (null || undefined) ? 1: id);

  const [breadcrumbs, setBreadCrumbs] = useState([{name: "Home", link: "/"+ props.location, taxon: "1"}]);
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
    list = <Specieslist taxonid={id} />;
    console.log("Home going to specieslist");
  } else if (props.obs == "true") {
    if (level != "obs")
      setLevel("obs");
    console.log('Home level: ', level);
    list = <Obslist taxonid={id} />;
    console.log("Home going to obslist");
  } else {
    if (level != "category")
      setLevel("category");
    list = <Categorylist taxonid={id} />;
    console.log("Home going to categorylist");
  }

  console.log("Home taxonid is ", props.taxonid, id);

  //() => setTaxonID((id === (null || undefined)) ? 1: id);

  return (
    <div className="">
        <DataContext.Provider value={userData}>
          <header>
            <div className="bg-[#E3A87B] text-4xl py-3 flex space-x-5 justify-center">
              <img src={leaf_left} width="100px" />
              <span>{userData.locationName} Life</span>
              <img src={leaf_right} width="100px" />
            </div>
            <Nav taxonid={id} />
          </header>
          {list}
        </DataContext.Provider>
    </div>
  );
}

export default Home;
