import {useContext} from 'react';
import {DataContext} from '../Home';
import { LinkContainer } from 'react-router-bootstrap';
import parse from 'html-react-parser';

const Species = (props) => {
  const dataContext = useContext(DataContext);

  const handleClick = (taxonID) => {
    dataContext.setTaxonID(taxonID);
  };

  //if no image, do not provide image URL
  const calcImageLink = () => {
    if (props.image.length < 1) {
      return '';
    } else {
      return (
        <div>
          <img src={"https://sicloot.com/private/lifelist/photos/"+props.image} width={props.imagewidth} height={props.imageheight} alt="" className="block mx-auto"/>
        </div>
      );
    }
  };

  //put an X below each month where the species was observed
  const calcMonths = () => {
    let monthLabel = '';
    if (props.months && props.months.length > 0) {
      for (let i = 1; i <= 12; i++) {
        if (props.months.includes(i.toString())) {
          monthLabel += '<span className="text-gray-700">X</span>';
        }
        else {
          monthLabel += '<span className="text-gray-200">X</span>';
        }
      }
      return monthLabel;
    }
    return '';
  };

  //list all years where the species was seen
  const calcYears = () => {
    let yearLabel = '';

    if (props.years && props.years.length > 0) {
      for (let i=0; i<props.years.length; i++) {
          yearLabel += props.years[i] + ' ';
      }
      return yearLabel;
    }
    return '';
  };

  return (
    <LinkContainer to={'/'+dataContext.location+'/obs/'+props.taxonid}>
      <button className="w-500 p-2 m-2 rounded overflow-hidden border-2 border-black" onClick={() => handleClick(props.taxonid)}>
        {calcImageLink()}
        <div className="px-2 pt-2">
          <div className="font-bold text-xl leading-5">{props.commonname}<br />
            <span className="font-normal text-sm italic">
              {props.scientificname}
            </span>
          </div>
          <p className="text-gray-700 text-xs">
            Obs: {props.obs}&nbsp;&nbsp;&nbsp;
            Total: {props.total}&nbsp;&nbsp;&nbsp;
            High Count: {props.max}
          </p>
        </div>
        <div className="px-3 pt-2 pb-1">
          <span className="font-mono inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{calcYears()}</span>
        </div>
        <div className="min-w-400 px-3 pt-2 pb-1">
          <span className="font-mono tracking-[.5em] inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">JFMAMJJASOND<br />{parse(calcMonths())}</span>
        </div>
      </button>
    </LinkContainer>
  );
}

export default Species;
