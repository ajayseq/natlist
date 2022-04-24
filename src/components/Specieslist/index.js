import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../Home';
import Species from '../Species';

const Specieslist = (props) => {
  const [categoryData, setCategoryData] = useState('');
  const dataContext = useContext(DataContext);
  let dataUrl = `https://sicloot.com/private/lifelist/api/specieslist.php?locationid=`+dataContext.locationID+`&taxonid=`+props.taxonid;

  //make API call to retrieve list of species
  useEffect(() => {
    const makeApiCall = () => {
      fetch(dataUrl)
      .then(res => res.json())
      .then(data =>  {
        setCategoryData(data);
       });
    }
    makeApiCall()

  }, [props.taxonid])

  const species = Object.entries(categoryData).map(([key, value], index) => {
      return (
          <Species key={value.taxonid}
                taxonid={value.taxonid}
                scientificname={value.scientificname}
                commonname={value.commonname}
                obs={value.obs}
                total={value.total}
                max={value.max}
                image={value.image}
                imagewidth={value.imagewidth}
                imageheight={value.imageheight}
                years={value.years}
                months={value.months}
                />
        );
      });

  return (
    <div className="inline-flex flex-wrap p-2 place-content-center">
      {species}
    </div>
  );
}

export default Specieslist;
