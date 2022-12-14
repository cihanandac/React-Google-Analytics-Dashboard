import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./lib/out";
import ChartsMonthly from "./components/ChartsMonthly";
import ChartsDaily from "./components/ChartsDaily";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState([]);

  const updateSignin = (signedIn) => {
    //(3)
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    //(2)
    checkSignedIn()
      .then((signedIn) => {
        updateSignin(signedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init); //(1)
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar isSignedIn={isSignedIn} />
        {!isSignedIn ? (
          <div>
            <div id="signin-button"></div>
          </div>
        ) : (
          <div className="content">
            <Routes>
              <Route
                exact
                path="/ChartsMonthly"
                element={<ChartsMonthly data={data} setData={setData} />}
              />
              <Route
                exact
                path="/ChartsDaily"
                element={<ChartsDaily data={data} setData={setData} />}
              />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
