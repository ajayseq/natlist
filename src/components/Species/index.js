import {useContext} from 'react';
import {DataContext} from '../Home';
import { Link } from 'react-router-dom';


const Species = (props) => {
  const dataContext = useContext(DataContext);

  const handleClick = (taxonID) => {
    dataContext.setTaxonID(taxonID);
    console.log('Species handleClick taxonid set to ', taxonID);
  };

  return (
    <button>
      <div><Link to={`/${dataContext.location}/obs/${props.taxonid}`} onClick={() => handleClick(props.taxonid)}>{props.commonname}</Link></div>
      <div>{props.scientificname}</div>
      <div>{props.species} species</div>
      <div>{props.obs} observations</div>
      <div>{props.total} total</div>
      <div>{props.max} high count</div>
      <div><img src={"https://sicloot.com/private/lifelist/photos/"+props.image} width="450"/></div>
    </button>
  );

}

export default Species;
