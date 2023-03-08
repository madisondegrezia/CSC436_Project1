import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBarComp from "./components/NavBarComp";
import Rates from "./components/Rates";
import Conversions from "./components/Conversions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBarComp />
      <Router>
        <Routes>
          <Route exact path="/" element={<Rates />} />
          <Route exact path="/conversions" element={<Conversions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
