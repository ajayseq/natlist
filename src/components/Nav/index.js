import {useContext} from 'react';
import {DataContext} from '../../App';
import { Route, Link, Redirect } from 'react-router-dom';

const Nav = () => {
  const dataContext = useContext(DataContext);

  return <div>{dataContext.breadcrumbs[0].name}</div>;

}

export default Nav;
