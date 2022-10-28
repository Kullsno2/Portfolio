import React, { Component } from "react";
import Home from "./components/home";
import resumeData from "./resumeData";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Home resumeData={resumeData} />
    </div>
  );
}

export default App;
