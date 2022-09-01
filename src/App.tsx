import { useState, useEffect } from "react";
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
import axios, { AxiosResponse } from "axios";

function App() {
  const [rawCountryData, setRawCountryData] = useState<CountryData[] | []>([]);

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
    const firstCountryData: CountryResponse = await getCountryData(
      firstCountryName
    );
    const secondCountryData: CountryResponse = await getCountryData(
      secondCountryName
    );

    setRawCountryData([
      formatCountryData(firstCountryData),
      formatCountryData(secondCountryData),
    ]);
  };

  const loadRandomCountryData = async () => {
    const firstRandomCountryName = await getRandomCountry();
    const secondRandomCountryName = await getRandomCountry();
    loadCountryData(firstRandomCountryName, secondRandomCountryName);
    setCountries({
      first: "",
      second: "",
    });
  };

  const firstCountry = rawCountryData[0];
  const secondCountry = rawCountryData[1];

  const [countryNames, setCountryNames] = useState<string[]>([]);

  type CountryNameResponse = {
    name: {
      common: string;
    };
  };

  const validEntries =
    countries.first &&
    countries.second &&
    countries.first.toLowerCase() !== countries.second.toLowerCase();

  useEffect(() => {
    const getCountryNamesList = async () => {
      const allCountries: AxiosResponse<CountryNameResponse[]> =
        await axios.get("https://restcountries.com/v3.1/all");
      const allCountryNames = allCountries.data
        .map((country) => country.name.common)
        .sort();
      setCountryNames(allCountryNames);
    };
    getCountryNamesList();
  }, []);

  return (
    <div className="App">
      <section id="search-wrapper">
        <h1 id="app-header">Enter Two Country Names</h1>
        <div id="input-wrapper">
          <CountryInput
            countryNames={countryNames}
            setCountry={(country: string) => {
              setCountries({ ...countries, first: country });
            }}
          />
          <CountryInput
            countryNames={countryNames}
            setCountry={(country: string) =>
              setCountries({ ...countries, second: country })
            }
          />

          <button
            className={validEntries ? "compare-btn" : "unclickable"}
            onClick={
              validEntries
                ? () => loadCountryData(countries.first, countries.second)
                : undefined
            }
            type="button"
          >
            Compare!
          </button>
          <button className="compare-btn" onClick={loadRandomCountryData}>
            Compare random
          </button>
        </div>
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
