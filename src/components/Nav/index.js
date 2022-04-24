import {useContext, useEffect} from 'react';
import {DataContext} from '../Home';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

const Nav = (props) => {
  const dataContext = useContext(DataContext);

  const links = dataContext.breadcrumbs.map((element, index) => {
    return (
      <>
        { (index > 0) ? parse('<li><span className="text-[#2D2219] mx-2">/</span></li>') : '' }
        <li className="text-center"><Link key={index} to={element.link} className="text-[#2D2219] hover:text-blue-800" onClick={() => handleClick(index, element.taxon)}>{element.name}</Link></li>
      </>
    );
  });

  const handleClick = (index, taxonID) => {
    //first delete all links after current one
    dataContext.setBreadCrumbs(breadcrumbs => breadcrumbs.slice(0, index + 1));
    dataContext.setTaxonID(taxonID);
  };

  //if back button is clicked, reset nav to current category
  useEffect(() => {
    console.log(' in nav useEffect');
    dataContext.breadcrumbs.forEach((crumb, index) => {
      console.log('nav checking bread crumbs ', crumb.taxon, props.taxonid, index);
      if (crumb.taxon === props.taxonid.toString()) {
        dataContext.setBreadCrumbs(breadcrumbs => breadcrumbs.slice(0, index + 1));
      }
    });
  }, [props.taxonid])

  //navbar css from tailwind-elements.com
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-[#F1D4BD] text-xl text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <nav className="bg-grey-light rounded-md w-full" aria-label="breadcrumb">
          <ol className="list-reset flex justify-center mr-8">
            {links}
          </ol>
        </nav>
      </div>
    </nav>
  );
}

export default Nav;
