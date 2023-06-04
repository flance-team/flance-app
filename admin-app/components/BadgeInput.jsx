"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3000";

const BadgeInput = ({ onBadgesChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [badges, setBadges] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    onBadgesChange(badges);
  }, [badges, onBadgesChange]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInputValue(suggestions[0]);
        addBadge(suggestions[0]);
      } else {
        addBadge(inputValue.trim());
      }
    }
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(`${baseUrl}/admins/skill?s=${value}`);
      const suggestionsData = response.data;

      const skillNames = suggestionsData.map((skill) => skill.name);

      setSuggestions(skillNames);
    } catch (error) {
      console.log(error);
    }
  };

  const addBadge = (badge) => {
    if (badge.trim() !== "") {
      setBadges([...badges, badge.trim()]);
      setInputValue("");
    }
  };

  const removeBadge = (index, e) => {
    e.preventDefault();
    const updatedBadges = [...badges];
    updatedBadges.splice(index, 1);
    setBadges(updatedBadges);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    addBadge(suggestion);
  };

  return (
    <div>
      <div className="flex">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white py-1 px-2 rounded-full mr-2"
          >
            {badge}
            <button
              className="ml-1 text-red-500"
              onClick={(e) => removeBadge(index, e)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Tab or Enter to input new Skills"
        className="border border-gray-300 rounded p-2 mt-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="mt-2">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer bg-gray-300 hover:bg-gray-400 p-2"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BadgeInput;
