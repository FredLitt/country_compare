import React, { useState } from "react";
import { useCombobox } from "downshift";

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
      if (!inputValue) {
        setFilteredCountries([]);
        setCountry("");
        setInvalidInput(false);
      }
      if (inputValue)
        setFilteredCountries(
          countryNames.filter(
            (item) =>
              !inputValue ||
              item.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      const inputExistsInCountryName =
        inputValue &&
        countryNames.some((name) =>
          name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
      const onlyRemainingCountry =
        inputValue &&
        countryNames.some(
          (name) => name.toLowerCase() === inputValue.toLowerCase()
        );
      if (onlyRemainingCountry) {
        setInvalidInput(false);
        return setCountry(inputValue);
      }
      if (!inputExistsInCountryName && inputValue !== "") {
        setInvalidInput(true);
      } else {
        setCountry("");
        setInvalidInput(false);
      }
    },
    items: filteredCountries,
    itemToString(item) {
      return item ? item : "";
    },
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      setCountry(newSelectedItem);
    },
  });

  const [invalidInput, setInvalidInput] = useState(false);

  return (
    <div>
      <label {...getLabelProps()} htmlFor="country-name-input"></label>
      <div style={{ display: "inline" }} {...getComboboxProps()}>
        <input
          {...getInputProps()}
          spellCheck="false"
          className="country-name-input"
          style={{
            border: invalidInput ? "1px solid red" : "1px solid var(--blue)",
          }}
        />
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
