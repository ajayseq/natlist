import {useContext} from 'react';
import {DataContext} from '../Home';
import { Link } from 'react-router-dom';


const Category = (props) => {
  const dataContext = useContext(DataContext);

  const handleClick = (taxonID) => {
    dataContext.setTaxonID(taxonID);
    console.log('Category handleClick taxonid set to ', taxonID);
  };

  //if less than 30 species, list out the species, otherwise go to a subcategory
  const calcLink = () => {
    if (props.species > 30) {
      return '/'+dataContext.location+'/'+props.taxonid;
    } else {
      return '/'+dataContext.location+'/species/'+props.taxonid;
    }
  }

  return (
    <button>
      <div><Link to={calcLink()} onClick={() => handleClick(props.taxonid)}>{props.commonname}</Link></div>
      <div>{props.scientificname}</div>
      <div>{props.species} species</div>
      <div>{props.obs} observations</div>
    </button>
  );

}

export default Category;
