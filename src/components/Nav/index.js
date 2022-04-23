import {useContext} from 'react';
import {DataContext} from '../Home';
import { Route, Link, Redirect } from 'react-router-dom';
import parse from 'html-react-parser';

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
        { (index > 0) ? parse('<li><span className="text-white mx-2">/</span></li>') : '' }
        <li className="text-center"><Link key={index} to={element.link} className="text-blue-100 hover:text-blue-800" onClick={() => handleClick(index, linkTaxon)}>{element.name}</Link></li>
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

  console.log('links is ', links);

  //navbar css from tailwind-elements.com
  //return <div><Link to={`/${dataContext.location}/${dataContext.breadcrumbs[0].link}`}>{dataContext.breadcrumbs[0].name}</Link></div>;
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-400 text-xl text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <nav className="bg-grey-light rounded-md w-full" aria-label="breadcrumb">
          <ol className="list-reset flex justify-center">
            {links}
          </ol>
        </nav>
      </div>
    </nav>
  );

}

export default Nav;
