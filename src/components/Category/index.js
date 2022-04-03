import {useContext} from 'react';
import {DataContext} from '../../App';

const Category = (props) => {
  const dataContext = useContext(DataContext);

  return <div>{props.commonname}</div>;

}

export default Category;
