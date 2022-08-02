import React from "react";
import { CountryData } from "./types";

export default function ComparisonTable({ firstCountry, secondCountry }: any) {
  interface ComparisonOption {
    country: CountryData;
    value: number;
  }

  const compareCountryValues = (
    first: ComparisonOption,
    second: ComparisonOption,
    propertyName: string
  ) => {
    const higherValue = Math.max(first.value, second.value);
    const lowerValue = Math.min(first.value, second.value);
    const multiple = Number(higherValue / lowerValue).toFixed(2);
    const countryWithHigherValue =
      first.value === higherValue ? first.country : second.country;
    const countryWithLowerValue =
      first.value === lowerValue ? first.country : second.country;
    return `${countryWithHigherValue.country} has ${multiple} times the ${propertyName} of ${countryWithLowerValue.country}`;
  };

  return (
    <table>
      <tbody>
        <tr>
          {compareCountryValues(
            { country: firstCountry, value: firstCountry.population },
            { country: secondCountry, value: secondCountry.population },
            "population"
          )}
        </tr>
        <tr>
          {compareCountryValues(
            { country: firstCountry, value: firstCountry.area },
            { country: secondCountry, value: secondCountry.area },
            "area"
          )}
        </tr>
        <tr>
          {compareCountryValues(
            { country: firstCountry, value: firstCountry.population_density },
            { country: secondCountry, value: secondCountry.population_density },
            "population density"
          )}
        </tr>
        <></>
      </tbody>
    </table>
  );
}
