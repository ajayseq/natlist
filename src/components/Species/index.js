import {useContext} from 'react';
import {DataContext} from '../Home';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import parse from 'html-react-parser';
import './species.css';

const Species = (props) => {
  const dataContext = useContext(DataContext);

  const handleClick = (taxonID) => {
    dataContext.setTaxonID(taxonID);
    console.log('Species handleClick taxonid set to ', taxonID);
  };

  //if no image, do not provide link
  const calcImageLink = () => {
    if (props.image.length < 1) {
      return '';
    } else {
      return (
        <div>
          <img src={"https://sicloot.com/private/lifelist/photos/"+props.image} width={props.imagewidth} height={props.imageheight} className="block mx-auto"/>
        </div>
      );
    }
  };

  const calcMonths = () => {
    let monthLabel = '';
    //console.log('calcMonths: props.months', props.months);
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

  //using tailwind css
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

  // return (
  //   <Card body className="text-left" color="light">
  //     <CardBody>
  //       <CardTitle tag="h3">
  //         {props.commonname}
  //       </CardTitle>
  //       <CardSubtitle className="mb-2 text-muted" tag="h5">
  //         {props.scientificname}
  //       </CardSubtitle>
  //     <div>{props.species} species</div>
  //     <div><Link to={`/${dataContext.location}/obs/${props.taxonid}`} onClick={() => handleClick(props.taxonid)}>{props.obs} observations</Link></div>
  //     <div>{props.total} total</div>
  //     <div>{props.max} high count</div>
  //     <div><img src={"https://sicloot.com/private/lifelist/photos/"+props.image} /></div>
  //     </CardBody>
  //   </Card>
  // );

}

export default Species;
