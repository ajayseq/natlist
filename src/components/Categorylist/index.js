import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../Home';
import Category from '../Category';

const Categorylist = (props) => {
  const [categoryData, setCategoryData] = useState('');
  const dataContext = useContext(DataContext);
  let dataUrl;

  //use categories for top-level categories else go to subcategories of the given taxon
  if (props.taxonid == 1) {
    dataUrl = `https://sicloot.com/private/lifelist/api/categories.php?locationid=`+dataContext.locationID;
  } else {
    dataUrl = `https://sicloot.com/private/lifelist/api/subcategories.php?locationid=`+dataContext.locationID+`&taxonid=`+props.taxonid;
  }

  console.log("Categorylist taxonid is ", props.taxonid);
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

  }, [])

  console.log('Categorylist categorydata: ', categoryData);

  const categories = Object.entries(categoryData).map(([key, value]) => {
      return (
          <Category key={value.taxonid}
                taxonid={value.taxonid}
                scientificname={value.scientificname}
                commonname={value.commonname}
                obs={value.obs}
                species={value.species}
                />
              );
    });

  return (
    <div>
      {categories}
    </div>
  );

}

export default Categorylist;
