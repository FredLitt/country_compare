import React from "react";
import { Datapoint } from "./types";

export default function ComparisonTable({ countryData }: any) {
  const findPopulationDensity = (countryData: Datapoint[]) => {
    const populationData = countryData.find(
      (data) => data.key === "Population"
    );
    const areaData = countryData.find((data) => data.key === "Area");
    if (!populationData || !areaData) return;
    const countryAPopulationDensity = Math.round(
      parseInt(populationData.firstCountry) / parseInt(areaData.firstCountry)
    );
    console.log(countryAPopulationDensity);
    return countryAPopulationDensity;
  };
  findPopulationDensity(countryData);
  //   const comparisonData: any[] = [
  //     {
  //       name: "Population Density",
  //       firstCountry: findPopulationDensity(countryData[0]),
  //       secondCountry: findPopulationDensity(countryData[1]),
  //     },
  //   ];

  return (
    <table>
      <tbody></tbody>
    </table>
  );
}
