import {useContext} from 'react';
import {DataContext} from '../Home';
import { Link } from 'react-router-dom';


const Category = (props) => {
  const dataContext = useContext(DataContext);

  return (
    <button>
      <div><Link to={`/${dataContext.location}/${props.taxonid}`} onClick={dataContext.setTaxonID(props.taxonid)}>{props.commonname}</Link></div>
      <div>{props.scientificname}</div>
      <div>{props.species} species</div>
      <div>{props.obs} observations</div>
    </button>
  );

}

export default Category;
