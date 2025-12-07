import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Papa from "papaparse";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    Papa.parse("/HSK_Words.txt", {
      download: true,
      delimiter: "\t||\t",
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  }, []);

  const handleSearch = () => {
    const entry = data.find((row) => row.Simplified === query);
    if (entry) {
      setResult(entry["English"]);
    } else {
      setResult("No definition found.");
    }
  };

  return (
    <div className="App">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>📖 HSK Dictionary</h1>
        <input
          type="text"
          placeholder="Enter Chinese word"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <button 
          onClick={handleSearch} 
          style={{ marginLeft: "10px", padding: "8px 12px", fontSize: "16px" }}
        >
          Search
        </button>
        <p style={{ marginTop: "20px", fontSize: "18px" }}>{result}</p>
      </div>
    </div>
  );
}

export default App;
