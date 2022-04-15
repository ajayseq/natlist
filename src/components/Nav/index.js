import {useContext} from 'react';
import {DataContext} from '../Home';
import { Route, Link, Redirect } from 'react-router-dom';

const Nav = () => {
  const dataContext = useContext(DataContext);

  // const links = dataContext.breadcrumbs.map((element, index) => {
  //   return (
  //     <Link key={index} to={`/${dataContext.location}/${element.link}`}>{element.name}</Link>
  //   );
  // });

  //return <div><Link to={`/${dataContext.location}/${dataContext.breadcrumbs[0].link}`}>{dataContext.breadcrumbs[0].name}</Link></div>;
  return <div>links</div>;

}

export default Nav;
