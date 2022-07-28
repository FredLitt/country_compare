import React, { useState } from 'react';
import CountryDataDisplay from './CountryDataDisplay';
import axios from 'axios';
import './App.css';

function App() {

  const [ countries, setCountries ] = useState(null)

  const [ country, setFirstCountry ] = useState("japan")
  const [ secondCountry, setSecondCountry ] = useState("thailand")

  const getCountryData = async (country) => {
    const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
    return countryResponse.data[0]
  }

  const formatCountryData = (country) => {
    return {
      name: country.name.common,
      flag: country.flags.svg,
      population: country.population,
      language: Object.values(country.languages),
      area: country.area,
      currency: country.currencies[Object.keys(country.currencies)].name,
      capital: country.capital[0],
      region: country.region,
      subregion: country.subregion
    }
  }

  const setCountryData = (firstCountry, secondCountry) => {
    const firstCountryData = formatCountryData(firstCountry)
    const secondCountryData = formatCountryData(secondCountry)
    setCountries({
      first: firstCountryData,
      second: secondCountryData,
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
        <h1 id="app-header">Enter the Names of Two Countries</h1>
        <input 
          placeholder="Enter first country's name" 
          value={country} 
          onChange={(e) => setFirstCountry(e.target.value)} type="text" />
        <input 
          placeholder="Enter second country's name" 
          value={secondCountry} 
          onChange={(e) => setSecondCountry(e.target.value)} type="text" />
      <button onClick={() => renderCountryData(country, secondCountry)} type="button">Compare!</button>
      <button onClick={renderRandomCountryData}>Compare random</button>
    {countries && <CountryDataDisplay countries={countries} />}
    </div>
  );
}

export default App;
