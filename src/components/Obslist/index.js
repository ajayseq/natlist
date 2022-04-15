import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../Home';
import Obs from '../Obs';

const Obslist = (props) => {
  const [obsData, setObsData] = useState('');
  const dataContext = useContext(DataContext);
  let dataUrl = `https://sicloot.com/private/lifelist/api/observations.php?locationid=`+dataContext.locationID+`&taxonid=`+props.taxonid;

  console.log("Obslist taxonid is ", props.taxonid);
  console.log(dataUrl);

  //make API call to retrieve categories or subcategories
  useEffect(() => {
    console.log('in obslist useEffect');
    const makeApiCall = () => {
      fetch(dataUrl)
      .then(res => res.json())
      .then(data =>  {
        console.log('Obslist data: ', data);
        setObsData(data);
       });
    }
    makeApiCall();

  }, [dataContext.level])

  console.log('Obslist obsdata: ', obsData);
  console.log('Obslist props level is ', dataContext.level);


  const obs = obsData.obs.map(([key, value], index) => {
      console.log('obsData.obs is ', obsData.obs);
      console.log('value is ', value);
        return (
            <Obs  key={index}
                  taxonid={obsData.taxonid}
                  scientificname={obsData.scientificname}
                  commonname={obsData.commonname}
                  starttime={value.starttime}
                  idlink={value.idlink}
                  count={value.count}
                  images={value.images}
                  //imagewidth={value.imagewidth}
                  //imageheight={value.imageheight}
                  />
          );
  });

  return (
    <div className="inline-flex flex-wrap p-2 place-content-center">
      {obs}
    </div>
  );

}

export default Obslist;
