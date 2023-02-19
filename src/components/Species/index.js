import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../Home';
import { LinkContainer } from 'react-router-bootstrap';
import parse from 'html-react-parser';
import invasiveplantsma from '../../invasive_plants_ma.txt';
import invasiveplantstx from '../../invasive_plants_tx.txt';

//load invasive plant text files into arrays
let arrInvasivePlantsMA = [];
let arrInvasivePlantsTX = [];

fetch(invasiveplantsma)
  .then(row => row.text())
  .then(text => {
    let arrTemp = text.split('\n');
    arrInvasivePlantsMA = [...arrTemp];
  });
fetch(invasiveplantstx)
  .then(row => row.text())
  .then(text => {
    let arrTemp = text.split('\n');
    arrInvasivePlantsTX = [...arrTemp];
  });


const Species = (props) => {
  const dataContext = useContext(DataContext);
  const [nsData, setNsData] = useState('');
  let dataUrlNSSearch = `https://explorer.natureserve.org/api/data/search`;

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

  //data from natureserve
  const calcNatureServe = () => {
    let returntext = '';
    let invasive = false;

    //first check if an invasive plant in TX or MA


    //only return results if one match, in US/Canada
    if ((nsData.resultsSummary) && (JSON.stringify(nsData.resultsSummary.totalResults) == "1") && ((dataContext.locationUSCA == "CA") || (dataContext.locationUSCA == "US"))) {
      if ((nsData.results[0]) && (nsData.results[0].nations)) {
        for (const nation of nsData.results[0].nations) {
          if (JSON.stringify(nation.nationCode) == '"'+dataContext.locationUSCA+'"') {
            for (const subnation of nation.subnations) {
              if (JSON.stringify(subnation.subnationCode) == '"'+dataContext.locationState+'"') {
                //first check if on invasive plants list
                if (dataContext.locationState == "MA") {
                  if (arrInvasivePlantsMA.includes(props.scientificname)) {
                    invasive = true;
                  }
                } else if (dataContext.locationState == "TX") {
                  if (arrInvasivePlantsTX.includes(props.scientificname)) {
                    invasive = true;
                  }
                }

                //check if native
                if (invasive) {
                  returntext = returntext +  "<span className='font-normal text-sm' style='color:red'>invasive!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
                } else if (subnation.native) {
                  returntext = returntext +  "<span className='font-normal text-sm' style='color:green'>native&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
                  //returntext = returntext + " " + JSON.stringify(subnation);
                } else if (subnation.exotic) {
                  returntext = returntext +  "<span className='font-normal text-sm' style='color:purple'>exotic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>";
                  //returntext = returntext + " " + JSON.stringify(subnation);
                }
                let subrank = JSON.stringify(subnation.roundedSRank);
                if (subrank.includes('SX')) {
                  returntext = returntext + "<span className='font-normal text-sm' style='color:red'>extirpated</span>";
                } else if (subrank.includes('SH')) {
                  returntext = returntext + "<span className='font-normal text-sm' style='color:red'>extirpated</span>";
                } else if (subrank.includes('S1')) {
                  returntext = returntext + "<span className='font-normal text-sm' style='color:red'>imperiled</span>";
                } else if (subrank.includes('S2')) {
                  returntext = returntext + "<span className='font-normal text-sm' style='color:red'>imperiled</span>";
                } else if (subrank.includes('S3')) {
                  returntext = returntext + "<span className='font-normal text-sm' style='color:orange'>vulnerable</span>";
                } else if (subrank.includes('S4')) {
                  returntext = returntext + "<span className='font-normal text-sm' style='color:black'>secure</span>";
                } else if (subrank.includes('S5')) {
                  returntext = returntext + "<span className='font-normal text-sm' style='color:black'>secure</span>";
                }
              }
            }
          }
        }
      }
    }
    return returntext;

  };

  //make API call to retrieve NatureServe data
  useEffect(() => {
    const nsRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "criteriaType" : "combined",
  		      "textCriteria" : [{
              "searchToken" : props.scientificname,
              "paramType" : "textSearch",
              "matchAgainst" : "allScientificNames",
              "operator" : "similarTo"
            }],
            "statusCriteria" : [ ],
            "locationCriteria" : [ ],
            "pagingOptions" : {
              "page" : null,
              "recordsPerPage" : null
            },
  		      "recordSubtypeCriteria" : [ ],
            "modifiedSince" : null,
            "locationOptions" : null,
            "classificationOptions" : {
              "includeInfraspecies" : false,
              "includeProvisional" : true,
              "includeNonstandard" : true
            },
  		      "recordTypeCriteria" : [{
              "paramType" : "recordType",
              "recordType" : "SPECIES"
            }]
        })
    };

    const makeApiCallNS = () => {
      fetch(dataUrlNSSearch, nsRequestOptions)
      .then(res => res.json())
      .then(nsData =>  {
        setNsData(nsData);
       });
    }
    makeApiCallNS()

  }, [props.taxonid])

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
          <div>{parse(calcNatureServe())}</div>
          <div className="text-gray-700 text-xs">
            Obs: {props.obs}&nbsp;&nbsp;&nbsp;
            Total: {props.total}&nbsp;&nbsp;&nbsp;
            High Count: {props.max}
          </div>
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
