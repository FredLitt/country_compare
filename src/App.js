import React, { useState } from 'react';
import CountryDataDisplay from './CountryDataDisplay';
import axios from 'axios';
import './App.css';

function App() {

  const [ countries, setCountries ] = useState(null)

  const [ firstCountry, setFirstCountry ] = useState("japan")
  const [ secondCountry, setSecondCountry ] = useState("thailand")

  const getCountryData = async (country) => {
    const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
    console.log(countryResponse)
    return countryResponse.data[0]
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

  const renderCountryData = async (firstCountry, secondCountry) => {
    console.log(firstCountry)
    const a = await getCountryData(firstCountry)
    const b = await getCountryData(secondCountry)
    setCountryData(a, b)
  }

  const renderRandomCountryData = () => {}

  return (
    <div className="App">
        <h1 id="app-header">Compare Two Countries</h1>
        <input 
          placeholder="Enter first country's name" 
          value={firstCountry} 
          onChange={(e) => setFirstCountry(e.target.value)} type="text" />
        <input 
          placeholder="Enter second country's name" 
          value={secondCountry} 
          onChange={(e) => setSecondCountry(e.target.value)} type="text" />
      <button onClick={() => renderCountryData(firstCountry, secondCountry)} type="button">Compare!</button>
      <button onClick={renderRandomCountryData}>Compare random</button>
    {countries && <CountryDataDisplay countries={countries} />}
    </div>
  );
}

export default App;
