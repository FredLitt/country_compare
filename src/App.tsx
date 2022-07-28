import React, { useState } from 'react';
import CountryDataDisplay from './CountryDataDisplay';
import axios, { AxiosResponse } from 'axios';
import './App.css';

interface CountryData {
  name: string,
  flag: string,
  population: number,
  //language: string,
  area: number,
  //currency: string,
  capital: string,
  region: string,
  subregion: string
}

function App() {

  const [ countries, setCountries ] = useState<null | { first: CountryData, second: CountryData }>(null)

  const [ country, setFirstCountry ] = useState("japan")
  const [ secondCountry, setSecondCountry ] = useState("thailand")

  const getCountryData = async (country: string) => {
    const countryResponse: AxiosResponse = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
    return countryResponse.data[0]
  }

  const formatCountryData = (countryData: any): CountryData => {
    return {
      name: countryData.name.common,
      flag: countryData.flags.svg,
      population: countryData.population,
      //language: Object.values(countryData.languages),
      area: countryData.area,
      //currency: country.currencies[Object.keys(country.currencies)].name,
      capital: countryData.capital[0],
      region: countryData.region,
      subregion: countryData.subregion
    }
  }

  const setCountryData = (firstCountry: any, secondCountry: any) => {
    const firstCountryData: CountryData = formatCountryData(firstCountry)
    const secondCountryData = formatCountryData(secondCountry)
    setCountries({
      first: firstCountryData,
      second: secondCountryData,
    })
    console.log(countries)
  }

  const renderCountryData = async (firstCountryName: string, secondCountryName: string) => {
    const a = await getCountryData(firstCountryName)
    const b = await getCountryData(secondCountryName)
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
