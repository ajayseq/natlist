import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../../App';
import Category from '../Category';

const Categorylist = (props) => {
  const [categoryData, setCategoryData] = useState('');
  const dataContext = useContext(DataContext);
  let dataUrl;

  //use categories for top-level categories else go to subcategories of the given taxon
  if (props.taxonid == 1) {
    dataUrl = `https://sicloot.com/private/lifelist/api/categories.php?locationid=`+dataContext.locationID;
  } else {
    dataUrl = `https://sicloot.com/private/lifelist/api/subcategories.php?locationid=`+dataContext.locationID+`taxonid=`+props.taxonid;
  }

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

  // const categories = categoryData.map((taxon) =>
  //     <Category key={taxon.taxonid}
  //               scientificname={taxon.scientificname}
  //               commonname={taxon.commonname}
  //               obs={taxon.obs}
  //               species={taxon.species}
  //      />
  //   );

  return (
    <div>
    </div>
  );

}

export default Categorylist;
