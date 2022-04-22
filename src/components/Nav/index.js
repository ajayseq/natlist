import {useContext} from 'react';
import {DataContext} from '../Home';
import { Route, Link, Redirect } from 'react-router-dom';

const Nav = () => {
  const dataContext = useContext(DataContext);

  const links = dataContext.breadcrumbs.map((element, index) => {
    let linkTaxon = element.link.slice(element.link.lastIndexOf("/")+1, element.link.length);
    if (isNaN(linkTaxon)) {
      linkTaxon = '1';
    }
    console.log('nav linkTaxon: ', linkTaxon);
    return (
      <>
        { (index > 0) ? ' -> ' : '' }
        <Link key={index} to={element.link} onClick={() => handleClick(index, linkTaxon)}>{element.name}</Link>
      </>
    );
  });

  const handleClick = (index, taxonID) => {
    //first delete all links after current one
    dataContext.setBreadCrumbs(breadcrumbs => breadcrumbs.slice(0, index + 1));
    //breadcrumbs => breadcrumbs.length(index+1)

    dataContext.setTaxonID(taxonID);
    console.log('Nav handleClick taxonid set to ', taxonID);
  };

  //return <div><Link to={`/${dataContext.location}/${dataContext.breadcrumbs[0].link}`}>{dataContext.breadcrumbs[0].name}</Link></div>;
  return <div>{links}</div>;

}

export default Nav;
