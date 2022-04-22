import {useState, useContext, useEffect} from 'react';
import {DataContext} from '../Home';
import moment from 'moment';
import { Tooltip, Button } from 'reactstrap';
import parse from 'html-react-parser';

const Obs = (props) => {
  const dataContext = useContext(DataContext);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [iNatData, setINatData] = useState();
  let iNaturalistObsID = props.idlink.slice(props.idlink.lastIndexOf("/")+1, props.idlink.length);
  let dataUrl = `https://api.inaturalist.org/v1/observations/` + iNaturalistObsID;

  const starttime = () => {
    return moment(props.starttime).format('YYYY-MM-DD h:mma');
  };

  //if no image, do not provide link
  // const calcImageLink = () => {
  //   if (props.images.length < 1) {
  //     return '';
  //   } else {
  //     return (
  //         <img src={"https://sicloot.com/private/lifelist/photos/"+props.image} width={props.imagewidth} height={props.imageheight} className="block mx-auto"/>
  //     );
  //   }
  //   return '';
  // };

  const images = props.images.map((obj, index) => {
        return (
            <img  key={index}
                  src={"https://sicloot.com/private/lifelist/photos/"+obj.image}
                  width={obj.imagewidth}
                  height={obj.imageheight}
                  className="block mx-auto p-1"
                  />
          );
  });

  useEffect(() => {
    const makeApiCall = () => {
      fetch(dataUrl)
      .then(res => res.json())
      .then(data =>  {
        setINatData(data);
        console.log('iNaturalist API URL: ', dataUrl);
        console.log('iNaturalist data: ', data.results[0].identifications);
       });
    }
    if (props.idlink.length > 1) {
      makeApiCall();
    }
  }, [])

  //Reactstrap Container and Row would not work inside tooltip so using html table
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
    console.log('idText: ', idText);
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
             <Button id={'IDToolTip' + iNaturalistObsID} color="link"><a href={props.idlink}>ID Link</a></Button>
                         <Tooltip
                             style={{maxWidth: '700px', textAlign: 'left', color: 'orange'}}
                             isOpen={tooltipOpen}
                             placement="right"
                             target={'IDToolTip' + iNaturalistObsID}
                             toggle={() => { setTooltipOpen(!tooltipOpen) }}>
                             {parse(iNaturalistIDs(iNatData))}
                         </Tooltip>

          </>
      );
    }
    return '';
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
        <div className="inline-flex flex-wrap">
          {images}
        </div>
      </div>
  );

}

export default Obs;
