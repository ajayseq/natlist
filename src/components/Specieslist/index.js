import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../Home';
import Species from '../Species';

const Specieslist = (props) => {
  const [categoryData, setCategoryData] = useState('');
  const dataContext = useContext(DataContext);
  let dataUrl = `https://sicloot.com/private/lifelist/api/specieslist.php?locationid=`+dataContext.locationID+`&taxonid=`+props.taxonid;

  console.log("Specieslist taxonid is ", props.taxonid);
  console.log(dataUrl);

  //make API call to retrieve categories or subcategories
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

  //whether to add the beginning or end of a flex
  // const flexStart = (index) => {
  //   if (index % 2 === 1) {
  //     return `<div className="d-flex flex-row">`;
  //   } else {
  //     return '';
  //   }
  // };
  //
  // const flexEnd = (index) => {
  //   if (index % 2 === 0) {
  //     return "</div>";
  //   } else {
  //     return '';
  //   }
  // };

  console.log('Specieslist categorydata: ', categoryData);

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
