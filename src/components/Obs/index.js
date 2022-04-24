import {useState, useEffect} from 'react';
import moment from 'moment';
import { Tooltip } from 'reactstrap';
import parse from 'html-react-parser';

const Obs = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [iNatData, setINatData] = useState();
  let iNaturalistObsID = props.idlink.slice(props.idlink.lastIndexOf("/")+1, props.idlink.length);
  let dataUrl = `https://api.inaturalist.org/v1/observations/` + iNaturalistObsID;

  //use Moment to format the date and time
  const starttime = () => {
    return moment(props.starttime).format('YYYY-MM-DD h:mma');
  };

  //all images
  const images = props.images.map((obj, index) => {
        return (
            <img  key={index}
                  src={"https://sicloot.com/private/lifelist/photos/"+obj.image}
                  width={obj.imagewidth}
                  height={obj.imageheight}
                  alt=""
                  className="block mx-auto p-1"
                  />
          );
  });

  //retrieve all identifications from iNaturalist API
  useEffect(() => {
    const makeApiCall = () => {
      fetch(dataUrl)
      .then(res => res.json())
      .then(data =>  {
        setINatData(data);
       });
    }
    if (props.idlink.length > 1) {
      makeApiCall();
    }
  }, [])

  //Reactstrap Container and Row would not work inside tooltip so using html table
  //get tooltip text with iNaturalist identification date
  const iNaturalistIDs = (data) => {
    let idText = '';

    if (data) {
      idText = '<table>';
      data.results[0].identifications.forEach(id => {
        if (JSON.parse(id.current)) {
          idText += '<tr><td valign="top">' + id.user.login + ':';
          if ((id.user.name) && (id.user.name.length > 0) && (id.user.name !== 'sicloot')) {
            idText += '<br />(' + id.user.name + ')';
          }
          idText += '</td><td valign="top">&nbsp;&nbsp;<i>' + id.taxon.name + '</i>';
          if (id.taxon.preferred_common_name) {
            idText += ' - ' + id.taxon.preferred_common_name;
          }
          if (id.body) {
            idText += '<br />&nbsp;&nbsp;"' + id.body + '"';
          }
          idText += '</td></tr>';
        }
      });
      idText += '</table>';
    }
    return idText;
  }

  //if no ID link, do not provide link
  const calcIDLink = () => {
    if (props.idlink.length < 1) {
      return '';
    } else {
    return (
          <>
           <span>&nbsp;&nbsp;&nbsp;</span>
             <a href={props.idlink}>
               <button id={'IDToolTip' + iNaturalistObsID} className="bg-[#E3A87B] hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full">ID Ref</button>
                         <Tooltip
                             style={{maxWidth: '700px', textAlign: 'left', color: 'orange'}}
                             isOpen={tooltipOpen}
                             placement="right"
                             target={'IDToolTip' + iNaturalistObsID}
                             toggle={() => { setTooltipOpen(!tooltipOpen) }}>
                             {parse(iNaturalistIDs(iNatData))}
                         </Tooltip>
             </a>
          </>
      );
    }
  };

  //using tailwind css
  return (
      <div className="p-2 m-2 rounded overflow-hidden border-2 border-black">
        <div className="px-3 pt-2 pb-1">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{starttime()}</span>
          <span className="text-gray-700 text-sm">
            Count: {props.count}{calcIDLink()}
          </span>
        </div>
        <div className="flex-wrap">
          {images}
        </div>
      </div>
  );
}

export default Obs;
