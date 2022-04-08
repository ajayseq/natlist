import {useState, useEffect, useContext} from 'react';
import {DataContext} from '../Home';
import Category from '../Category';

const Categorylist = (props) => {
  const [categoryData, setCategoryData] = useState('');
  const dataContext = useContext(DataContext);
  const categoryColors = ["#ad291d", "#D29B59", "#678533", "#f77c17", "#914d39", "#f1ad0c", "#C17541", "#A24F46", "#8E4D63", "#D29B59", "#ad291d", "#ad291d", "#ad291d", "#ad291d"];
  let dataUrl;

  //use categories for top-level categories else go to subcategories of the given taxon
  if (props.taxonid == 1) {
    dataUrl = `https://sicloot.com/private/lifelist/api/categories.php?locationid=`+dataContext.locationID;
  } else {
    dataUrl = `https://sicloot.com/private/lifelist/api/subcategories.php?locationid=`+dataContext.locationID+`&taxonid=`+props.taxonid;
  }

  console.log("Categorylist taxonid is ", props.taxonid);
  console.log(dataUrl);

  //make API call to retrieve categories or subcategories52
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

  const categories = Object.entries(categoryData)
        .map(([key, value], index) => {
      return (
          <Category key={value.taxonid}
                taxonid={value.taxonid}
                scientificname={value.scientificname}
                commonname={value.commonname}
                obs={value.obs}
                species={value.species}
                backgroundColor={categoryColors[index]}
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
