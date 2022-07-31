import React, { useState } from 'react';
import { getCountryData, formatCountryData, createCountryDataArray, getRandomCountry } from './apputils'
import CountryInput from './CountryInput';
import { Datapoint } from './types'
import CountryDataTable from './CountryDataTable';
import ComparisonTable from './ComparisonTable';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
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
      <section id="search-wrapper">
        <h1 id="app-header">Enter the Names of Two Countries</h1>
        <CountryInput number="first" value={countries.first} countries={countries} setInput={(e: React.ChangeEvent<HTMLInputElement>) => setCountries({...countries, first: e.target.value})} />
        <CountryInput number="second" value={countries.second} countries={countries} setInput={(e: React.ChangeEvent<HTMLInputElement>) => setCountries({...countries, second: e.target.value})} />
        <button className="compare-btn" onClick={() => renderCountryData(countries.first, countries.second)} type="button">Compare!</button>
        <button className="compare-btn" onClick={renderRandomCountryData}>Compare random</button>
      </section>
      <CountryDataTable countryData={countryData} />
      <ComparisonTable countryData={countryData} />
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </div>
  );
}

export default App;
