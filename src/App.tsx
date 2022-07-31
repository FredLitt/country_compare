import React, { useState } from "react";
import {
  getCountryData,
  formatCountryData,
  createCountryDataArray,
  getRandomCountry,
} from "./apputils";
import CountryInput from "./CountryInput";
import { CountryData, Datapoint } from "./types";
import CountryDataTable from "./CountryDataTable";
import ComparisonTable from "./ComparisonTable";
import Map from "./Map";
import "./App.css";

function App() {
  const [rawCountryData, setRawCountryData] = useState<CountryData[] | []>([]);
  const countryData =
    rawCountryData.length === 0
      ? []
      : createCountryDataArray(rawCountryData[0], rawCountryData[1]);
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
    const firstCountryData: unknown = (await getCountryData(
      firstCountryName
    )) as unknown;
    const secondCountryData: unknown = await getCountryData(secondCountryName);
    setRawCountryData([
      formatCountryData(firstCountryData),
      formatCountryData(secondCountryData),
    ]);
    setCountries({ first: "", second: "" });
  };

  const renderRandomCountryData = async () => {
    const firstRandomCountryName = await getRandomCountry();
    const secondRandomCountryName = await getRandomCountry();
    loadCountryData(firstRandomCountryName, secondRandomCountryName);
    setCountries({ first: "", second: "" });
  };

  const firstCountryLatLong = rawCountryData[0]?.latlng;
  const secondCountryLatLong = rawCountryData[1]?.latlng;

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
        <button className="compare-btn" onClick={renderRandomCountryData}>
          Compare random
        </button>
      </section>
      <CountryDataTable countryData={countryData} />
      <ComparisonTable countryData={countryData} />

      {rawCountryData.length !== 0 && (
        <Map
          firstCountryLatLong={firstCountryLatLong}
          secondCountryLatLong={secondCountryLatLong}
          rawCountryData={rawCountryData}
        />
      )}
    </div>
  );
}

export default App;
