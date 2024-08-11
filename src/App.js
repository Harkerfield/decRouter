import React, { useContext, useState, useEffect } from "react";
import CollapsibleHeader from "./Components/HeaderHorizontal/HeaderHorizontal.js";

import Home from "./Pages/Home/Home.js";
import Debug from "./Pages/Debug/Debug.js";
import DecModifier from "./Pages/DecModifier/DecModifier.js";

import { ConfigContext } from "./Provider/Context.js";
import "./App.css";
import "./AFStyle.css";

const App = () => {
  const config = useContext(ConfigContext);
  const [settings, setSettings] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    setSettings(config);
  }, [config]);

  if (!settings) {
    return;
  }
  return (
    <div className="container af-background-blue">
      <CollapsibleHeader>
        <button
          className="navButton"
          onClick={(e) => {
            e.preventDefault();
            setActiveSection(null);
          }}
          disabled={activeSection === null ? true : false}
        >
          Home
        </button>
       
       
        {settings.decModifier === true && (
          <button
            className="navButton"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("decModifier");
            }}
            disabled={activeSection === "decModifier" ? true : false}
          >
            decModifier
          </button>
        )}
        {settings.debug === true && (
          <button
            className="navButton"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("debug");
            }}
            disabled={activeSection === "debug" ? true : false}
          >
            Debug
          </button>
        )}
      </CollapsibleHeader>

      {activeSection === null && (
        <div>
          <Home />
        </div>
      )}
      {activeSection === "decModifier" && (
        <div>
          <DecModifier />
        </div>
      )}

      {activeSection === "debug" && (
        <div>
          <Debug />
        </div>
      )}
    </div>
  );
};

export default App;
