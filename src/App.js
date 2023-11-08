import React, { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./components/home/home";
import DetailsPage from "./components/detailsPage/detailsPage";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="details" element={<DetailsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
