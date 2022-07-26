import React, { useState } from 'react';
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
    const secondCountry = secondCountryResponse.data[0]
    setCountryData(firstCountry, secondCountry)
    console.log(firstCountry)
    setCountries({
      name: firstCountry.name.common,

      population: firstCountry.population,
      flag: firstCountry.flags.svg,
      language: Object.values(firstCountry.languages),
      currency: firstCountry.currencies[Object.keys(firstCountry.currencies)].name,
      capital: firstCountry.capital[0],
      region: firstCountry.region,
      subregion: firstCountry.subregion
    })
    console.log(countries)
  }

  const setCountryData = (firstCountry, secondCountry) => {

  }

  return (
    <div className="App">
      <div>
        <h1>Country Compare</h1>
        <input value={firstCountry} onChange={(e) => setFirstCountry(e.target.value)} type="text" />
        <input value={secondCountry} onChange={(e) => setSecondCountry(e.target.value)} type="text" />
        <button onClick={() => getCountryData("japan", "thailand")} type="button">Compare!</button>
      </div>
    {countries &&
    <>
      <h1>{countries.name}</h1>
      <img src={countries.flag} alt="" />
      <table>
        <tr>
          <td>Population</td><td>{countries.population}</td>
        </tr>
        <tr>
          <td>Language</td><td>{countries.language}</td>
        </tr>
        <tr>
          <td>Currency</td><td>{countries.currency}</td>
        </tr>
        <tr>
          <td>Capital</td><td>{countries.capital}</td>
        </tr>
        <tr>
          <td>Region</td><td>{countries.region}</td>
        </tr>
        <tr>
          <td>Subregion</td><td>{countries.subregion}</td>
        </tr>
      </table>
      </>}

    </div>
  );
}

export default App;
