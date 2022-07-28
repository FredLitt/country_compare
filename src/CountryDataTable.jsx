import React from 'react';

export default function CountryDataTable({ countries }) {
  console.log(countries)
  return (
    <>      
      <table id="country-data-table">
        <tbody>
          <tr>
            <td></td><td>{countries.first.name}</td><td>{countries.second.name}</td>
          </tr>
          <tr>
            <td></td><td><img src={countries.first.flag} alt="" /></td><td><img src={countries.second.flag} alt="" /></td>
          </tr>
        <tr>
          <td>Population</td><td>{countries.first.population}</td><td>{countries.second.population}</td>
        </tr>
        <tr>
          <td>Language</td><td>{countries.first.language}</td><td>{countries.second.language}</td>
        </tr>
        <tr>
          <td>Area</td><td>{countries.first.area}</td><td>{countries.second.area}</td>
        </tr>
        <tr>
          <td>Currency</td><td>{countries.first.currency}</td><td>{countries.second.currency}</td>
        </tr>
        <tr>
          <td>Capital</td><td>{countries.first.capital}</td><td>{countries.second.capital}</td>
        </tr>
        <tr>
          <td>Region</td><td>{countries.first.region}</td><td>{countries.second.region}</td>
        </tr>
        <tr>
          <td>Subregion</td><td>{countries.first.subregion}</td><td>{countries.second.subregion}</td>
        </tr>
        </tbody>
      </table>
      </>
  )
}
