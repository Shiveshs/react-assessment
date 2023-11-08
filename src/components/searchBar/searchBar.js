import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";
import Loader from "../loader/loader";
import Error from "../error/error";

const SearchBar = ({ setResult }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setError(null);
    setResult([]);
  };

  const onSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions("");
    onSearchHandler(suggestion);
  };

  const onSearchHandler = (suggestion) => {
    setLoading(true);
    const param = suggestion ? suggestion : input;
    if (param) {
      const fetchDrugList = fetch(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${param}`
      )
        .then((response) => response.json())
        .then((json) => {
          const drugGroupList = json?.drugGroup?.conceptGroup;
          if (drugGroupList) {
            drugGroupList.map((drugGroups, index) => {
              for (let key in drugGroups) {
                if (
                  drugGroups.hasOwnProperty(key) &&
                  key === "conceptProperties"
                ) {
                  drugGroups[key].map((drug) => {
                    setResult((current) => [...current, drug]);
                    setLoading(false);
                  });
                }
              }
            });
          } else {
            const fetchSuggestion = fetch(
              `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${input}`
            )
              .then((response) => response.json())
              .then((json) => {
                const suggestionList =
                  json?.suggestionGroup?.suggestionList?.suggestion;
                if (suggestionList) {
                  setSuggestions(suggestionList);
                  setLoading(false);
                } else {
                  setError("No suggestions popped up. kindly try again");
                  setLoading(false);
                }
              });
          }
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };
  return (
    <div>
      <div className="input-container">
        <input
          placeholder="Search here..."
          value={input}
          onChange={(e) => onChangeHandler(e)}
          onKeyDown={(e) => e.key === "Enter" && onSearchHandler()}
        />
        <div className="searchIcon" onClick={() => onSearchHandler()}>
          <FaSearch id="search-icon" />
        </div>
      </div>
      {loading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : error ? (
        <Error errorMessage={error} />
      ) : (
        <div className="suggestion-container">
          {suggestions && (
            <div className="suggestion-title">
              Kindly select from the following suggestions:
            </div>
          )}
          {suggestions &&
            suggestions.map((suggestion, index) => {
              return (
                <div
                  onClick={() => onSuggestionClick(suggestion)}
                  className="suggestion"
                  key={index + suggestion}
                >
                  {suggestion}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
