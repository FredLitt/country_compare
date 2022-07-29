import React, { useState } from 'react';
import CountryDataTable from './CountryDataTable';
import axios, { AxiosResponse } from 'axios';
import './App.css';
import { stringify } from 'querystring';

interface CountryData {
  country: string,
  flag: string,
  population: string,
  language: string,
  area: string,
  currency: string,
  capital: string,
  region: string,
  subregion: string
}

interface Datapoint {
  key: string,
  firstCountry: string,
  secondCountry: string 
}

function App() {

  const [ countryData, setCountryData ] = useState<Datapoint[] | []>([])

  const [ countries, setCountries ] = useState( { first: "japan", second: "turkey"} )

  const getCountryData = async (country: string) => {
    const countryResponse: AxiosResponse = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
    console.log(countryResponse.data[0], countryResponse.data[0].currencies)
    return countryResponse.data[0]
  }

  const formatCountryData = (countryData: any): CountryData => {
    return {
      country: countryData.name.common,
      flag: countryData.flags.svg,
      population: countryData.population,
      language: countryData.languages[Object.keys(countryData.languages)[0]],
      area: countryData.area,
      currency: countryData.currencies[Object.keys(countryData.currencies)[0]].name,
      capital: countryData.capital[0],
      region: countryData.region,
      subregion: countryData.subregion
    }
  }

  const createCountryDataArray = (firstCountryData: CountryData, secondCountryData: CountryData) : Datapoint[] => {
    const countryDataArray = []
    const dataKeys = Object.keys(firstCountryData)
    for (let i = 0; i < dataKeys.length; i++){
      const keyName = dataKeys[i].charAt(0).toUpperCase() + dataKeys[i].slice(1)
      const datapoint : Datapoint = {
        key: keyName,
        firstCountry: Object.values(firstCountryData)[i],
        secondCountry: Object.values(secondCountryData)[i]
      }
      countryDataArray.push(datapoint)
    }
    return countryDataArray
  }

  const renderCountryData = async (firstCountryName: string, secondCountryName: string) => {
    const missingCountryName = (firstCountryName === "" || secondCountryName === "")
    const sameCountry = (firstCountryName === secondCountryName)
    if (missingCountryName || sameCountry) return
    const firstCountryData = await getCountryData(firstCountryName)
    const secondCountryData = await getCountryData(secondCountryName)
    const countryDataArray = createCountryDataArray(formatCountryData(firstCountryData),formatCountryData( secondCountryData))
    setCountryData(countryDataArray)
  }

  const pickRandomCountry = async () => {
    const allCountries = await axios.get("https://restcountries.com/v3.1/all")
    const randomIndex = Math.floor(Math.random() * allCountries.data.length)
    const randomCountryName: string = allCountries.data[randomIndex].name.common
    return randomCountryName
  }

  const renderRandomCountryData = async () => {
    const firstRandomCountryName = await pickRandomCountry()
    const secondRandomCountrName = await pickRandomCountry()
    renderCountryData(firstRandomCountryName, secondRandomCountrName)
    setCountries({ first: "", second: "" })
  }

  return (
    <div className="App">
        <h1 id="app-header">Enter the Names of Two Countries</h1>
        <input 
          placeholder="Enter first country's name" 
          value={countries.first} 
          onChange={(e) => setCountries({...countries, first: e.target.value})} type="text" />
        <input 
          placeholder="Enter second country's name" 
          value={countries.second} 
          onChange={(e) => setCountries({...countries, second: e.target.value})} type="text" />
      <button onClick={() => renderCountryData(countries.first, countries.second)} type="button">Compare!</button>
      <button onClick={renderRandomCountryData}>Compare random</button>
    {countryData && 
      <>
        <CountryDataTable countryData={countryData} />
      </>}
    </div>
  );
}

export default App;
