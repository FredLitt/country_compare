import React, { useState } from "react";
import {
  getCountryData,
  formatCountryData,
  createCountryDataArray,
  getRandomCountry,
} from "./apputils";
import CountryInput from "./CountryInput";
import type { CountryData, CountryResponse } from "./types";
import CountryDataTable from "./CountryDataTable";
import ComparisonTable from "./ComparisonTable";
import Map from "./Map";
import "./App.css";

function App() {
  const [rawCountryData, setRawCountryData] = useState<CountryData[] | []>([]);
  const [formValidationMessage, setFormValidationMessage] =
    useState<string>("");

  const countryDataArray =
    rawCountryData.length === 0 ? [] : createCountryDataArray(rawCountryData);

  const [countries, setCountries] = useState({
    first: "",
    second: "",
  });

  const loadCountryData = async (
    firstCountryName: string,
    secondCountryName: string
  ) => {
    const missingCountryName =
      firstCountryName === "" || secondCountryName === "";
    const sameCountry = firstCountryName === secondCountryName;
    if (missingCountryName)
      return setFormValidationMessage("Please enter two country names.");
    if (sameCountry)
      return setFormValidationMessage(
        "Please enter two different country names."
      );
    const firstCountryData: CountryResponse = await getCountryData(
      firstCountryName
    );
    const secondCountryData: CountryResponse = await getCountryData(
      secondCountryName
    );
    const invalidResponse =
      firstCountryData === "error" || secondCountryData === "error";
    if (invalidResponse) {
      setFormValidationMessage("Please enter valid country names.");
    }
    setRawCountryData([
      formatCountryData(firstCountryData),
      formatCountryData(secondCountryData),
    ]);
    setCountries({ first: "", second: "" });
    setFormValidationMessage("");
  };

  const loadRandomCountryData = async () => {
    const firstRandomCountryName = await getRandomCountry();
    const secondRandomCountryName = await getRandomCountry();
    loadCountryData(firstRandomCountryName, secondRandomCountryName);
    setCountries({ first: "", second: "" });
    setFormValidationMessage("");
  };

  const firstCountry = rawCountryData[0];
  const secondCountry = rawCountryData[1];

  return (
    <div className="App">
      <section id="search-wrapper">
        <h1 id="app-header">Enter the Names of Two Countries</h1>

        <CountryInput
          number="first"
          value={countries.first}
          countries={countries}
          setInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCountries({ ...countries, first: e.target.value })
          }
          loadCountryData={loadCountryData}
        />
        <CountryInput
          number="second"
          value={countries.second}
          countries={countries}
          setInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCountries({ ...countries, second: e.target.value })
          }
          loadCountryData={loadCountryData}
        />
        <button
          className="compare-btn"
          onClick={() => loadCountryData(countries.first, countries.second)}
          type="button"
        >
          Compare!
        </button>
        <button className="compare-btn" onClick={loadRandomCountryData}>
          Compare random
        </button>
        {<>{formValidationMessage}</>}
      </section>
      {rawCountryData.length !== 0 && (
        <>
          <CountryDataTable countryDataArray={countryDataArray} />
          <ComparisonTable
            firstCountry={firstCountry}
            secondCountry={secondCountry}
          />
          <Map
            firstCountryLatLong={firstCountry.latlng}
            secondCountryLatLong={secondCountry.latlng}
            rawCountryData={rawCountryData}
          />
        </>
      )}
    </div>
  );
}

export default App;
