import React from "react";
import Downshift from "downshift";

type CountryInputProps = {
  countryNames: string[] | [];
  setCountry: any;
  loadCountryData: any;
};

export default function CountryInput({
  countryNames,
  setCountry,
  loadCountryData,
}: CountryInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") loadCountryData();
  };

  return (
    <Downshift
      itemToString={(item) => (item ? item : "")}
      onChange={(item) => {
        console.log(item);
        setCountry(item);
      }}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <label {...getLabelProps()} htmlFor="country-name-input"></label>
          <div style={{ display: "inline" }}>
            <input
              {...getInputProps()}
              onKeyDown={handleKeyDown}
              className="country-name-input"
            />
          </div>
          <ul className="country-names" {...getMenuProps()}>
            {isOpen
              ? countryNames
                  .filter(
                    (item) =>
                      !inputValue || item.toLowerCase().startsWith(inputValue)
                  )
                  .map((item, index) =>
                    index < 20 ? (
                      <li
                        {...getItemProps({
                          key: item,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                          },
                        })}
                      >
                        {item}
                      </li>
                    ) : null
                  )
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
}
