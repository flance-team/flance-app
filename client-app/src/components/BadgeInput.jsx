"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://localhost:3000";

const BadgeInput = ({ onBadgesChange }) => {
  const [inputValue, setInputValue] = useState("");
  const [badges, setBadges] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    onBadgesChange(badges);
  }, [badges, onBadgesChange]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
    if (value === "") {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex !== -1 && suggestions.length > 0) {
        setInputValue(suggestions[selectedIndex]);
        addBadge(suggestions[selectedIndex]);
      } else {
        addBadge(inputValue.trim());
      }
      setSelectedIndex(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = selectedIndex + 1;
      if (nextIndex < suggestions.length) {
        setSelectedIndex(nextIndex);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = selectedIndex - 1;
      if (prevIndex >= 0) {
        setSelectedIndex(prevIndex);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
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
      setSelectedIndex(-1);
    }
    setSuggestions([]);
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
      <div className="flex flex-wrap">
        {badges.map((badge, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-x-0.5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-1 mt-1"
          >
            {badge}
            <button
              type="button"
              className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-green-600/20"
              onClick={(e) => removeBadge(index, e)}
            >
              <span className="sr-only">Remove</span>
              <svg
                viewBox="0 0 14 14"
                className="h-3.5 w-3.5 stroke-green-700/50 group-hover:stroke-green-700/75"
              >
                <path d="M4 4l6 6m0-6l-6 6" />
              </svg>
              <span className="absolute -inset-1" />
            </button>
          </span>
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
        <ul className="mt-2 bg-gray-100">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 ${
                index === selectedIndex ? "bg-gray-300" : ""
              }`}
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
