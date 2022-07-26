import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [ countries, setCountries ] = useState(null)

  const [ firstCountry, setFirstCountry ] = useState("")
  const [ secondCountry, setSecondCountry ] = useState("")

  const getCountryData = async (countryName) => {
    const countryResponse = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`)
    console.log(countryResponse.data)
    setCountries(countryResponse.data)
  }

  return (
    <div className="App">
      <div>
        <h1>Country Compare</h1>
        <input value={firstCountry} onChange={(e) => setFirstCountry(e.target.value)} type="text" />
        <input value={secondCountry} onChange={(e) => setSecondCountry(e.target.value)} type="text" />
        <button onClick={() => getCountryData("japan")} type="button">Compare!</button>
      </div>
    {countries &&
    <table>
      {countries.map((data) => 
      <th>{data.area}</th>)
      }
    </table>}

    </div>
  );
}

export default App;
