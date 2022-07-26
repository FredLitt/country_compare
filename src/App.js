import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [ countries, setCountry ] = useState({ firstCountry: null, secondCountry: null })

  const [ firstCountry, setFirstCountry ] = useState("")
  const [ secondCountry, setSecondCountry ] = useState("")
console.log(firstCountry, secondCountry)
  return (
    <div className="App">
      <div>
        <h1>Country Compare</h1>
        <input value={firstCountry} onChange={(e) => setFirstCountry(e.target.value)} type="text" />
        <input value={secondCountry} onChange={(e) => setSecondCountry(e.target.value)} type="text" />
        <button type="button">Compare!</button>

        <table>

        </table>
      </div>
    </div>
  );
}

export default App;
