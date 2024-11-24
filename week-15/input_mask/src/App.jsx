import React, { useState, useEffect } from "react";

import styled from "styled-components";

const MessageDiv = styled.div`
  width: 321px;
  border-radius: 10px;
  border: 1px dashed red;
  margin-top: 10px;
  font-style: italic;
  font-weight: 600;
  font-size: 1.2rem;
`;

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [cities, setCities] = useState([]);

  // Fetch cities from cities.json
  useEffect(() => {
    fetch("../src/assets/cities.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setCities(data))
      .catch((error) => console.error("Error loading cities:", error));
  }, []);

  // Update suggestion dynamically
  useEffect(() => {
    if (inputValue.trim() === "") {
      setSuggestion(""); // Clear suggestion if input is empty
    } else {
      const match = cities.find((city) => city.startsWith(inputValue));
      setSuggestion(match || ""); // Update suggestion with match or clear it
    }
  }, [inputValue, cities]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to highlight matching letters at the start
  const getHighlightedSuggestion = () => {
    if (!suggestion) return "";

    const inputLower = inputValue.toLowerCase();
    const suggestionLower = suggestion.toLowerCase();

    let matchingPart = "";
    let nonMatchingPart = suggestion;

    // Check matching characters from the start
    for (let i = 0; i < inputLower.length; i++) {
      if (inputLower[i] === suggestionLower[i]) {
        matchingPart += suggestion[i];
        nonMatchingPart = suggestion.slice(i + 1);
      } else {
        break;
      }
    }

    return (
      <>
        <span style={{ color: "#000", fontWeight: "bold" }}>
          {matchingPart}
        </span>
        <span style={{ color: "#999", fontWeight: "normal" }}>
          {nonMatchingPart}
        </span>
      </>
    );
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>City Suggestion Input</h2>
      <div style={{ position: "relative", width: "300px", margin: "0 auto" }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        {/* Suggested text below input */}
        {suggestion && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "10px",
              marginTop: "5px",
              fontSize: "14px",
              color: "#999",
            }}
          >
            {getHighlightedSuggestion()}
          </div>
        )}
        {!suggestion.length && (
          <MessageDiv>
            {" "}
            <p>There is nothing to show.</p>
          </MessageDiv>
        )}
      </div>
    </div>
  );
};

export default App;
