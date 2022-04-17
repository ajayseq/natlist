import {useContext} from 'react';
import {DataContext} from '../Home';
import moment from 'moment';

const Obs = (props) => {
  const dataContext = useContext(DataContext);

  const starttime = () => {
    return moment(props.starttime).format('YYYY-MM-DD h:mma');
  };

  //if no image, do not provide link
  // const calcImageLink = () => {
  //   if (props.images.length < 1) {
  //     return '';
  //   } else {
  //     return (
  //         <img src={"https://sicloot.com/private/lifelist/photos/"+props.image} width={props.imagewidth} height={props.imageheight} className="block mx-auto"/>
  //     );
  //   }
  //   return '';
  // };

  const images = props.images.map((obj, index) => {
        return (
            <img  key={index}
                  src={"https://sicloot.com/private/lifelist/photos/"+obj.image}
                  width={obj.imagewidth}
                  height={obj.imageheight}
                  className="block mx-auto p-1"
                  />
          );
  });

  //if no ID link, do not provide link
  const calcIDLink = () => {
    if (props.idlink.length < 1) {
      return '';
    } else {
      return (
          <>
           <span>&nbsp;&nbsp;&nbsp;</span>
           <a href={props.idlink}>ID Link</a>
          </>
      );
    }
    return '';
  };

  //using tailwind css
  return (
      <div className="p-2 m-2 rounded overflow-hidden border-2 border-black">
        <div className="px-3 pt-2 pb-1">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{starttime()}</span>
        </div>
        <div className="inline-flex flex-wrap">
          {images}
        </div>
        <div className="px-2 pt-2">
          <p className="text-gray-700 text-sm">
            Count: {props.count}{calcIDLink()}
          </p>
        </div>
      </div>
  );

}

export default Obs;
