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
  const [countries, setCountries] = useState(countryNames);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setCountries(
        countryNames.filter(
          (item) =>
            !inputValue ||
            item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
    items: countries,
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
          ? countries.map((item, index) => (
              <li
                {...getItemProps({
                  key: item,
                  index,
                  item,
                  style: {
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
