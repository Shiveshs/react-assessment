import React from "react";
import "./searchResult.css";
import { Link } from "react-router-dom";

const SearchResult = ({ result }) => {
  const finalDrugList =
    result &&
    result.map((drug) => (
      <Link key={drug.rxcui} to="/details" state={{ drugDetails: drug }}>
        <div className="list-item">{drug.name}</div>
      </Link>
    ));
  return <div className="result-list">{finalDrugList}</div>;
};

export default SearchResult;
