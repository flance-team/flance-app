"use client";
import React, { useState } from "react";

const BadgeInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [badges, setBadges] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" || e.key === "Enter") {
      e.preventDefault();
      addBadge();
    }
  };

  const addBadge = () => {
    if (inputValue.trim() !== "") {
      setBadges([...badges, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeBadge = (index) => {
    const updatedBadges = [...badges];
    updatedBadges.splice(index, 1);
    setBadges(updatedBadges);
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
              onClick={() => removeBadge(index)}
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
        placeholder="Type and press Tab or Enter"
        className="border border-gray-300 rounded p-2 mt-2"
      />
    </div>
  );
};

export default BadgeInput;
