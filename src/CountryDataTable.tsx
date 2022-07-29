import React, { useState } from 'react';
import { Datapoint } from './types';
import { renderData } from './CountryDataTableUtils'

export default function CountryDataTable({countryData} : any) {

  return (   
     <table id="country-data-table">
      <tbody >
        {countryData.map((data: Datapoint, index: number) =>
        <tr key={index}>
          <td>{data.key}</td>
          {renderData(data)}
        </tr>)}
      </tbody>
    </table>
  )
}
