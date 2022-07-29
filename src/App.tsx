import React, { useState } from 'react';
import { getCountryData, formatCountryData, createCountryDataArray, getRandomCountry } from './apputils'
import CountryInput from './CountryInput';
import { Datapoint } from './types'
import CountryDataTable from './CountryDataTable';
import './App.css';

function App() {

  const [ countryData, setCountryData ] = useState<Datapoint[] | []>([])

  const [ countries, setCountries ] = useState( { first: "japan", second: "turkey"} )

  const renderCountryData = async (firstCountryName: string, secondCountryName: string) => {
    const missingCountryName = (firstCountryName === "" || secondCountryName === "")
    const sameCountry = (firstCountryName === secondCountryName)
    if (missingCountryName || sameCountry) return
    const firstCountryData = await getCountryData(firstCountryName)
    const secondCountryData = await getCountryData(secondCountryName)
    const countryDataArray = createCountryDataArray(formatCountryData(firstCountryData),formatCountryData( secondCountryData))
    setCountryData(countryDataArray)
    setCountries({ first: "", second: "" })
  }

  const renderRandomCountryData = async () => {
    const firstRandomCountryName = await getRandomCountry()
    const secondRandomCountryName = await getRandomCountry()
    renderCountryData(firstRandomCountryName, secondRandomCountryName)
    setCountries({ first: "", second: "" })
  }

  return (
    <div className="App">
      <h1 id="app-header">Enter the Names of Two Countries</h1>
      <CountryInput number="first" value={countries.first} countries={countries} setInput={(e: React.ChangeEvent<HTMLInputElement>) => setCountries({...countries, first: e.target.value})} />
      <CountryInput number="second" value={countries.second} countries={countries} setInput={(e: React.ChangeEvent<HTMLInputElement>) => setCountries({...countries, second: e.target.value})} />
      
      <button onClick={() => renderCountryData(countries.first, countries.second)} type="button">Compare!</button>
      <button onClick={renderRandomCountryData}>Compare random</button>
      <CountryDataTable countryData={countryData} />
    </div>
  );
}

export default App;
