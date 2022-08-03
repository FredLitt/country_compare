import React from "react";
import type { Datapoint } from "./Types";
import { formatData } from "./CountryDataTableUtils";

export default function CountryDataTable({ countryDataArray }: any) {
  countryDataArray = countryDataArray.filter(
    (data: { key: string }) => data.key !== "Latlng"
  );

  return (
    <table id="country-data-table">
      <tbody>
        {countryDataArray.map((data: Datapoint, index: number) => (
          <tr key={index}>
            <td>{data.key}</td>
            {formatData(data)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
