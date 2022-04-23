import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../Home';
import Obs from '../Obs';

const Obslist = (props) => {
  const [obsData, setObsData] = useState({ obs: [] });
  const dataContext = useContext(DataContext);
  let dataUrl = `https://sicloot.com/private/lifelist/api/observations.php?locationid=`+dataContext.locationID+`&taxonid=`+props.taxonid;

  console.log("Obslist taxonid is ", props.taxonid);
  console.log(dataUrl);

  //make API call to retrieve categories or subcategories
  useEffect(() => {
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

  console.log('Obslist obsdata obs: ', obsData.obs);
  console.log('Obslist props level is ', dataContext.level);

  const obs = obsData.obs.map((obj, index) => {
      console.log('obs time and count is ', obj.starttime, obj.count);
        return (
            <Obs  key={index}
                  starttime={obj.starttime}
                  idlink={obj.idlink}
                  count={obj.count}
                  images={obj.images}
                  //imagewidt h={value.imagewidth}
                  //imageheight={value.imageheight}
                  />
          );
  });

  return (
    <div className="">
      <div>
          <h2 className="mt-2">{obsData.commonname}</h2><br />
          <h4 className="italic -mt-8">{obsData.scientificname}</h4>
      </div>
      <div className="inline-flex flex-wrap p-2 place-content-left text-left">
        {obs}
      </div>
    </div>
  );

}

export default Obslist;
