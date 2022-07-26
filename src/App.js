import React, { useState } from 'react';
import CountryDataDisplay from './CountryDataDisplay';
import axios from 'axios';
import './App.css';

function App() {

  const [ countries, setCountries ] = useState(null)

  const [ firstCountry, setFirstCountry ] = useState("")
  const [ secondCountry, setSecondCountry ] = useState("")

  const getCountryData = async (firstCountryName, secondCountryName) => {
    const firstCountryResponse = await axios.get(`https://restcountries.com/v3.1/name/${firstCountryName}`)
    const secondCountryResponse = await axios.get(`https://restcountries.com/v3.1/name/${secondCountryName}`)
    const firstCountry = firstCountryResponse.data[0]
    console.log(firstCountry)
    const secondCountry = secondCountryResponse.data[0]
    setCountryData(firstCountry, secondCountry)
  }

  const setCountryData = (firstCountry, secondCountry) => {
    setCountries({
      first: {
        name: firstCountry.name.common,
        population: firstCountry.population,
        flag: firstCountry.flags.svg,
        language: Object.values(firstCountry.languages),
        area: firstCountry.area,
        currency: firstCountry.currencies[Object.keys(firstCountry.currencies)].name,
        capital: firstCountry.capital[0],
        region: firstCountry.region,
        subregion: firstCountry.subregion
      },
      second: {
        name: secondCountry.name.common,
        population: secondCountry.population,
        flag: secondCountry.flags.svg,
        language: Object.values(secondCountry.languages),
        area: secondCountry.area,
        currency: secondCountry.currencies[Object.keys(secondCountry.currencies)].name,
        capital: secondCountry.capital[0],
        region: secondCountry.region,
        subregion: secondCountry.subregion
      },
    })
    console.log(countries)
  }

  return (
    <div className="App">
      <div>
        <h1>Country Compare</h1>
        <input value={firstCountry} onChange={(e) => setFirstCountry(e.target.value)} type="text" />
        <input value={secondCountry} onChange={(e) => setSecondCountry(e.target.value)} type="text" />
      </div>
      <button onClick={() => getCountryData("japan", "thailand")} type="button">Compare!</button>
    {countries && <CountryDataDisplay countries={countries} />}
    </div>
  );
}

export default App;
