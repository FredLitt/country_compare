import React from "react";
import { Datapoint } from "./types";
import { formatData } from "./CountryDataTableUtils";

export default function CountryDataTable({ countryData }: any) {
  countryData = countryData.filter(
    (data: { key: string }) => data.key !== "Latlng"
  );

  return (
    <table id="country-data-table">
      <tbody>
        {countryData.map((data: Datapoint, index: number) => (
          <tr key={index}>
            <td>{data.key}</td>
            {formatData(data)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
