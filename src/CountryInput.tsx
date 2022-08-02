import React from "react";

export default function CountryInput({
  number,
  value,
  countries,
  setInput,
  loadCountryData,
}: any) {
  const handleKeyDown = (key: string) => {
    if (key !== "Enter") return;
    loadCountryData();
  };

  return (
    <input
      className="country-name-input"
      value={value}
      onChange={setInput}
      type="text"
      placeholder={`Enter ${number} country`}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        handleKeyDown(e.key)
      }
    />
  );
}
