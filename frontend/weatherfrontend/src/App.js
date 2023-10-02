import logo from './logo.svg';
import './App.css';
import Options from "./components/options.component";
import Calendar from "./components/calendar.component";
import React from "react";

function App() {
  return (
    <div className="App">


      <Options/>
        <Calendar/>
    </div>
  );
}

export default App;
