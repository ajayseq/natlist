import {useState} from 'react';
import { useParams } from "react-router";
import './App.css';
import Home from './components/Home';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {
  const [taxonid, setTaxonID] = useState(1);
  //let { taxonid } = useParams();
  //console.log("App taxonid: ", taxonid);

  return (
    <div className="App">
        <Routes>
          <Route exact path="/" element={<Home locationID="27" location="garden" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} />} />
          <Route exact path="garden" element={<Home locationID="27" location="garden" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} />} />
          <Route path="garden/:id" element={<Home locationID="27" location="garden" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        </Routes>
    </div>
  );
}

export default App;
