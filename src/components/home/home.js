import React, { useState } from "react";
import SearchBar from "../searchBar/searchBar";
import SearchResult from "../searchResult/searchResult";
import "./home.css";

const Home = () => {
  const [result, setResult] = useState([]);
  return (
    <div className="search-bar-container">
      <SearchBar setResult={setResult} />
      <SearchResult result={result} />
    </div>
  );
};

export default Home;
