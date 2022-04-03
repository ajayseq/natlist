import {useEffect, useContext} from 'react';
import {DataContext} from '../../App';

const Categorylist = (props) => {
  const dataContext = useContext(DataContext);

  useEffect(() => {

    let dataUrl = `https://sicloot.com/private/lifelist/api/categories.php?locationid=`+dataContext.locationID;

    const makeApiCall = () => {
      fetch(dataUrl)
      .then(res => res.json())
      .then(data =>  {
        console.log('categoryData: ', data);
        //setMovieData((data))
       });
    }
    makeApiCall()

  }, [])

  return <div>Categories</div>;

}

export default Categorylist;
