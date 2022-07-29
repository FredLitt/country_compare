import React from 'react';

export default function CountryDataTable({ countryData }) {

  return (   
     <table id="country-data-table">
      <tbody >
        {countryData.map((data, index) =>
        <tr key={index}>
            <td>{data.key}</td>
            {data.key === "Flag" ? 
            <>
              <td><img src={data.firstCountry} alt=""/></td>
              <td><img src={data.secondCountry} alt=""/></td>
            </> :
            <>
              <td>{data.firstCountry}</td>
              <td>{data.secondCountry}</td>
            </>}
          </tr>)}
        </tbody>
      </table>
  )
}
