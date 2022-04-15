import {useContext} from 'react';
import {DataContext} from '../Home';

const Obs = (props) => {
  const dataContext = useContext(DataContext);

  //if no image, do not provide link
  const calcImageLink = () => {
    if (props.image.length < 1) {
      return '';
    } else {
      return (
        <div>
          <img src={"https://sicloot.com/private/lifelist/photos/"+props.image} width={props.imagewidth} height={props.imageheight} className="block mx-auto"/>
        </div>
      );
    }
  };

  //using tailwind css
  return (
      <div className="w-500 p-2 m-2 rounded overflow-hidden border-2 border-black">
        {calcImageLink()}
        <div className="px-2 pt-2">
          <div className="font-bold text-xl leading-5">{props.commonname}<br />
            <span className="font-normal text-sm italic">
              {props.scientificname}
            </span>
          </div>
          <p className="text-gray-700 text-xs">
            Total: {props.total}&nbsp;&nbsp;&nbsp;
            High Count: {props.max}
          </p>
        </div>
        <div className="px-3 pt-2 pb-1">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
        </div>
      </div>
  );

}

export default Obs;
