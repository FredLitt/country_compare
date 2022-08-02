import React, { useState } from "react";
import {
  getCountryData,
  formatCountryData,
  createCountryDataArray,
  getRandomCountry,
} from "./apputils";
import CountryInput from "./CountryInput";
import { CountryData } from "./types";
import CountryDataTable from "./CountryDataTable";
import ComparisonTable from "./ComparisonTable";
import Map from "./Map";
import "./App.css";
import { AxiosResponse } from "axios";

function App() {
  const [rawCountryData, setRawCountryData] = useState<CountryData[] | []>([]);

  const countryDataArray =
    rawCountryData.length === 0 ? [] : createCountryDataArray(rawCountryData);

  const [countries, setCountries] = useState({
    first: "japan",
    second: "turkey",
  });

  const loadCountryData = async (
    firstCountryName: string,
    secondCountryName: string
  ) => {
    const missingCountryName =
      firstCountryName === "" || secondCountryName === "";
    const sameCountry = firstCountryName === secondCountryName;
    if (missingCountryName || sameCountry) return;
    const firstCountryData: AxiosResponse = (await getCountryData(
      firstCountryName
    )) as AxiosResponse;
    const secondCountryData: AxiosResponse = (await getCountryData(
      secondCountryName
    )) as AxiosResponse;
    setRawCountryData([
      formatCountryData(firstCountryData),
      formatCountryData(secondCountryData),
    ]);
    setCountries({ first: "", second: "" });
  };

  const loadRandomCountryData = async () => {
    const firstRandomCountryName = await getRandomCountry();
    const secondRandomCountryName = await getRandomCountry();
    loadCountryData(firstRandomCountryName, secondRandomCountryName);
    setCountries({ first: "", second: "" });
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
        />
        <CountryInput
          number="second"
          value={countries.second}
          countries={countries}
          setInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCountries({ ...countries, second: e.target.value })
          }
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
