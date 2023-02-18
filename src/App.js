import {useState} from 'react';
import './App.css';
import Home from './components/Home';
import { Router, Routes, Route } from 'react-router-dom';

function App() {
  const [taxonid, setTaxonID] = useState(1);
  //let { taxonid } = useParams();
  //console.log("App taxonid: ", taxonid);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home locationID="27" location="garden" locationUSCA = "US" locationState="MA" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route exact path="garden" element={<Home locationID="27" location="garden" locationUSCA = "US" locationState="MA" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="garden/:id" element={<Home locationID="27" location="garden" locationUSCA = "US" locationState="MA" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="garden/species/:id" element={<Home locationID="27" location="garden" locationUSCA = "US" locationState="MA" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} species="true" />} />
        <Route path="garden/obs/:id" element={<Home locationID="27" location="garden" locationUSCA = "US" locationState="MA" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} obs="true" />} />

        <Route exact path="yard" element={<Home locationID="149" location="yard" locationUSCA = "US" locationState="MA" locationName="Yard" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="yard/:id" element={<Home locationID="149" location="yard" locationUSCA = "US" locationState="MA" locationName="Yard" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="yard/species/:id" element={<Home locationID="149" location="yard" locationUSCA = "US" locationState="MA" locationName="Yard" taxonid={taxonid} setTaxonID={setTaxonID} species="true" />} />
        <Route path="yard/obs/:id" element={<Home locationID="149" location="yard" locationUSCA = "US" locationState="MA" locationName="Yard" taxonid={taxonid} setTaxonID={setTaxonID} obs="true" />} />

        <Route exact path="arb" element={<Home locationID="12" location="arb" locationUSCA = "US" locationState="MA" locationName="Arnold Arboretum" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="arb/:id" element={<Home locationID="12" location="arb" locationUSCA = "US" locationState="MA" locationName="Arnold Arboretum" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="arb/species/:id" element={<Home locationID="12" location="arb" locationUSCA = "US" locationState="MA" locationName="Arnold Arboretum" taxonid={taxonid} setTaxonID={setTaxonID} species="true" />} />
        <Route path="arb/obs/:id" element={<Home locationID="12" location="arb" locationUSCA = "US" locationState="MA" locationName="Arnold Arboretum" taxonid={taxonid} setTaxonID={setTaxonID} obs="true" />} />

        <Route exact path="pond" element={<Home locationID="18" location="pond" locationUSCA = "US" locationState="MA" locationName="Jamaica Pond" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="pond/:id" element={<Home locationID="18" location="pond" locationUSCA = "US" locationState="MA" locationName="Jamaica Pond" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="pond/species/:id" element={<Home locationID="18" location="pond" locationUSCA = "US" locationState="MA" locationName="Jamaica Pond" taxonid={taxonid} setTaxonID={setTaxonID} species="true" />} />
        <Route path="pond/obs/:id" element={<Home locationID="18" location="pond" locationUSCA = "US" locationState="MA" locationName="Jamaica Pond" taxonid={taxonid} setTaxonID={setTaxonID} obs="true" />} />

        <Route exact path="txhouse" element={<Home locationID="341" location="txhouse" locationUSCA = "US" locationState="TX" locationName="Texas Family" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="txhouse/:id" element={<Home locationID="341" location="txhouse" locationUSCA = "US" locationState="TX" locationName="Texas Family" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="txhouse/species/:id" element={<Home locationID="341" location="txhouse" locationUSCA = "US" locationState="TX" locationName="Texas Family" taxonid={taxonid} setTaxonID={setTaxonID} species="true" />} />
        <Route path="txhouse/obs/:id" element={<Home locationID="341" location="txhouse" locationUSCA = "US" locationState="TX" locationName="Texas Family" taxonid={taxonid} setTaxonID={setTaxonID} obs="true" />} />

        <Route exact path="quinn" element={<Home locationID="38" location="quinn" locationUSCA = "US" locationState="NH" locationName="Quinn House" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="quinn/:id" element={<Home locationID="38" location="quinn" locationUSCA = "US" locationState="NH" locationName="Quinn House" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="quinn/species/:id" element={<Home locationID="38" location="quinn" locationUSCA = "US" locationState="NH" locationName="Quinn House" taxonid={taxonid} setTaxonID={setTaxonID} species="true" />} />
        <Route path="quinn/obs/:id" element={<Home locationID="38" location="quinn" locationUSCA = "US" locationState="NH" locationName="Quinn House" taxonid={taxonid} setTaxonID={setTaxonID} obs="true" />} />

        <Route exact path="spectacle" element={<Home locationID="100" location="spectacle" locationUSCA = "US" locationState="MA" locationName="Spectacle Island" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="spectacle/:id" element={<Home locationID="100" location="spectacle" locationUSCA = "US" locationState="MA" locationName="Spectacle Island" taxonid={taxonid} setTaxonID={setTaxonID} />} />
        <Route path="spectacle/species/:id" element={<Home locationID="100" location="spectacle" locationUSCA = "US" locationState="MA" locationName="Spectacle Island" taxonid={taxonid} setTaxonID={setTaxonID} species="true" />} />
        <Route path="spectacle/obs/:id" element={<Home locationID="100" location="spectacle" locationUSCA = "US" locationState="MA" locationName="Spectacle Island" taxonid={taxonid} setTaxonID={setTaxonID} obs="true" />} />

        <Route path="*" element={<Home locationID="27" location="garden" locationName="Community Garden" taxonid={taxonid} setTaxonID={setTaxonID} />} />
      </Routes>
    </div>
  );
}

export default App;
