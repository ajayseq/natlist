import {useContext} from 'react';
import {DataContext} from '../Home';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import './category.css';

import bird from './bird.png';
import insect from './insect.png';
import snail from './snail.png';
import mushroom from './mushroom.png';
import plant from './plant.png';
import deer from './deer.png';
import snake from './snake.png';
import fish from './fish.png';
import worm from './worm.png';

const Category = (props) => {
  const dataContext = useContext(DataContext);

  const handleClick = (taxonID) => {
    dataContext.setTaxonID(taxonID);
    dataContext.setBreadCrumbs(breadcrumbs => [...breadcrumbs, {name: props.commonname, link: calcLink()}] );
    console.log('Category handleClick taxonid set to ', taxonID);
  };

  //if less than 30 species, list out the species, otherwise go to a subcategory
  const calcLink = () => {
    if (props.commonname === "Birds") {
      return '/'+dataContext.location+'/species/'+props.taxonid;
    }
    if (props.species > 30) {
      return '/'+dataContext.location+'/'+props.taxonid;
    } else {
      return '/'+dataContext.location+'/species/'+props.taxonid;
    }
  };

  //include appropriate image if exists
  const calcImage = () => {
    switch (props.commonname) {
      case 'Birds':
        return (<img src={bird} width="40"></img>);
        break;
      case 'Arthropods':
        return (<img src={insect} width="40"></img>);
        break;
      case 'Mollusks':
        return (<img src={snail} width="35"></img>);
        break;
      case 'Fungi':
        return (<img src={mushroom} width="30"></img>);
        break;
      case 'Plants':
        return (<img src={plant} width="30"></img>);
        break;
      case 'Mammals':
        return (<img src={deer} width="30"></img>);
        break;
      case 'Reptiles':
        return (<img src={snake} width="40"></img>);
        break;
      case 'Fish':
        return (<img src={fish} width="30"></img>);
        break;
      case 'Annelids':
        return (<img src={worm} width="30"></img>);
        break;
      default:
        return '';
    }
  };

  return (
    <LinkContainer to={calcLink()} style={{backgroundColor: props.backgroundColor}}>
      <button type="button" className="btn-circle" onClick={() => handleClick(props.taxonid)}>
        <div className="divCommon">{props.commonname}</div>
        <div className="divScientific">{props.scientificname}</div>
        <div className="divImage">{calcImage()}</div>
        <div>{props.species} species</div>
        <div>{props.obs} observations</div>
      </button>
    </LinkContainer>
  );

}

export default Category;
