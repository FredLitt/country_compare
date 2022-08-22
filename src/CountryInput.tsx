import React, { useState } from "react";
import Downshift, { useCombobox } from "downshift";

type CountryInputProps = {
  countryNames: string[];
  setCountry: any;
  loadCountryData: any;
  inputValue: string;
};

export default function CountryInput({
  countryNames,
  setCountry,
  loadCountryData,
  inputValue,
}: CountryInputProps) {
  const [filteredCountries, setFilteredCountries] = useState(countryNames);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      if (inputValue)
        setFilteredCountries(
          countryNames.filter(
            (item) =>
              !inputValue ||
              item.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      if (filteredCountries.length === 1) {
        setCountry(filteredCountries[0]);
      }
    },
    items: filteredCountries,
    itemToString(item) {
      return item ? item : "";
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      console.log("selected:", selectedItem);
      setCountry(newSelectedItem);
    },
  });

  return (
    <div>
      <label {...getLabelProps()} htmlFor="country-name-input"></label>
      <div style={{ display: "inline" }} {...getComboboxProps()}>
        <input {...getInputProps()} className="country-name-input" />
      </div>
      <ul className="country-names" {...getMenuProps()}>
        {isOpen
          ? filteredCountries.map((item, index) => (
              <li
                {...getItemProps({
                  key: item,
                  index,
                  item,
                  style: {
                    padding: ".25em",
                    backgroundColor:
                      highlightedIndex === index ? "lightgray" : "white",
                    fontWeight: selectedItem === item ? "bold" : "normal",
                  },
                })}
              >
                {item}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}
