import React from "react";
import { CountryData, LatLong } from "./types";

export default function ComparisonTable({ firstCountry, secondCountry }: any) {
  interface ComparisonOption {
    first: { country: CountryData; value: number };
    second: { country: CountryData; value: number };
    propertyName: string;
  }

  const populationOptions = {
    first: { country: firstCountry, value: firstCountry.population },
    second: { country: secondCountry, value: secondCountry.population },
    propertyName: "population",
  };

  const areaOptions = {
    first: { country: firstCountry, value: firstCountry.area },
    second: { country: secondCountry, value: secondCountry.area },
    propertyName: "area",
  };

  const populationDensity = {
    first: { country: firstCountry, value: firstCountry.population_density },
    second: { country: secondCountry, value: secondCountry.population_density },
    propertyName: "population density",
  };

  const compareCountryValues = (options: ComparisonOption) => {
    const { first, second, propertyName } = options;
    const higherValue = Math.max(first.value, second.value);
    const lowerValue = Math.min(first.value, second.value);
    const multiple = Number(higherValue / lowerValue).toFixed(2);
    const countryWithHigherValue =
      first.value === higherValue ? first.country : second.country;
    const countryWithLowerValue =
      first.value === lowerValue ? first.country : second.country;
    return `${countryWithHigherValue.country} has ${multiple} times the ${propertyName} of ${countryWithLowerValue.country}`;
  };

  const degreesToRadians = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  // Haversine formula: returns straight line distance
  const getDistanceBetweenCountries = (
    firstCountryLatlong: LatLong,
    secondCountryLatLong: LatLong
  ) => {
    const [firstLat, firstLong] = firstCountryLatlong;
    const [secondLat, secondLong] = secondCountryLatLong;
    const earthRadiusInKm = 6371;
    const dLat = degreesToRadians(secondLat - firstLat);
    const dLong = degreesToRadians(secondLong - firstLong);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(firstLat)) *
        Math.cos(degreesToRadians(secondLat)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);

    const c = 2 * Math.asin(Math.sqrt(a));
    const distance = Number(c * earthRadiusInKm).toFixed(2);
    return `${firstCountry.country} and ${secondCountry.country} are ${distance} km apart`;
  };

  return (
    <table id="comparison-table">
      <tbody>
        <tr>{compareCountryValues(populationOptions as ComparisonOption)}</tr>
        <tr>{compareCountryValues(areaOptions as ComparisonOption)}</tr>
        <tr>{compareCountryValues(populationDensity as ComparisonOption)}</tr>
        <tr>
          {getDistanceBetweenCountries(
            firstCountry.latlng as LatLong,
            secondCountry.latlng as LatLong
          )}
        </tr>
      </tbody>
    </table>
  );
}
