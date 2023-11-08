import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./detailsPage.css";
import Loader from "../loader/loader";
import Error from "../error/error";

const DetailsPage = () => {
  const location = useLocation();
  const { drugDetails } = location.state;
  const [NDC, setNDC] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchNDCs = fetch(
      `https://rxnav.nlm.nih.gov/REST/rxcui/${drugDetails.rxcui}/ndcs.json`
    )
      .then((response) => response.json())
      .then((json) => {
        const ndcList = json?.ndcGroup?.ndcList?.ndc;
        if (ndcList) {
          setNDC(ndcList);
          setLoading(false);
        }
        else{
          setError("No NDCs found for this drug.")
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="table-container">
        <div className="details-table-wrapper">
          <table id="table">
            <tbody>
              <tr className="title">
                <th colSpan="3">Drug Details</th>
              </tr>
              <tr>
                <th>Drug id</th>
                <td>{drugDetails.rxcui}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{drugDetails.name}</td>
              </tr>
              <tr>
                <th>Synonym</th>
                <td>{drugDetails.synonym}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error errorMessage={error}/>
        ) : (
          <div className="ndc-table-wrapper">
            <table id="table">
              <thead>
                <tr className="title">
                  <th colSpan="2">NDCs details</th>
                </tr>
                <tr>
                  <th>Sr. No.</th>
                  <th>NDCs</th>
                </tr>
              </thead>
              <tbody>
                {NDC &&
                  NDC.map((ndc, index) => (
                    <tr key={ndc}>
                      <td>{index + 1}</td>
                      <td>{ndc}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default DetailsPage;
