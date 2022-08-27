import React, { useState, useEffect } from "react";
import "./App.css";
import { renderButton, checkSignedIn } from "./lib/out";
import Charts from "./components/Charts";

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
  });

  return (
    <div className="App">
      {!isSignedIn ? (
        <div id="signin-button"></div>
      ) : (
        <div>
          <Charts 
            data={data}
            setData={setData}
          />
        </div>
      )}
    </div>
  );
}

export default App;