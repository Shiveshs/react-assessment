import React, {useState} from 'react'
import "./App.css";
import Layout from './components/Layout';
import Home from './components/home/home';
import DetailsPage from "./components/detailsPage/detailsPage"
import {Routes, Route} from "react-router-dom"

// import SearchBar from "./components/searchBar/searchBar";
// import SearchResult from "./components/searchResult/searchResult";


const App = () => {
  // const [result, setResult] = useState([]);
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="" element={<Home/>}/>
        <Route path="details" element={<DetailsPage/>}/>
      </Route>
    </Routes>
    // <div className="App">
    //   <div className="search-bar-container">
    //   <SearchBar setResult={setResult} />
    //   <SearchResult result = {result}/>
    //   </div>  
    // </div>
  );
};

export default App;
