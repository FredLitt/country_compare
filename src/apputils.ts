import axios, { AxiosResponse } from "axios";
import { CountryData, Datapoint } from "./types";

const getCountryData = async (country: string) => {
  try {
    const countryResponse: AxiosResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    console.log(countryResponse.data[0], countryResponse.data[0].currencies);
    return countryResponse.data[0];
  } catch (error) {
    return "error";
  }
};

const formatCountryData = (countryData: any): CountryData => {
  return {
    country: countryData.name.common,
    flag: countryData.flags.svg,
    languages: Object.values(countryData.languages).toString(),
    population: countryData.population,
    area: countryData.area,
    population_density: Math.round(
      parseInt(countryData.population) / parseInt(countryData.area)
    ),
    currency: countryData.currencies
      ? countryData.currencies[Object.keys(countryData.currencies)[0]].name
      : "",
    capital: countryData.capital,
    region: countryData.region,
    subregion: countryData.subregion,
    latlng: countryData.latlng,
  };
};

const createCountryDataArray = (rawCountryData: CountryData[]): Datapoint[] => {
  const [firstCountryData, secondCountryData] = rawCountryData;
  const countryDataArray = [];
  const dataKeys = Object.keys(firstCountryData);
  for (let i = 0; i < dataKeys.length; i++) {
    const keyName = (
      dataKeys[i].charAt(0).toUpperCase() + dataKeys[i].slice(1)
    ).replace("_", " ");
    const datapoint: Datapoint = {
      key: keyName,
      firstCountry: Object.values(firstCountryData)[i],
      secondCountry: Object.values(secondCountryData)[i],
    };
    countryDataArray.push(datapoint);
  }
  return countryDataArray;
};

const getRandomCountry = async () => {
  const allCountries = await axios.get("https://restcountries.com/v3.1/all");
  const randomIndex = Math.floor(Math.random() * allCountries.data.length);
  const randomCountryName: string = allCountries.data[randomIndex].name.common;
  return randomCountryName;
};

export {
  getCountryData,
  formatCountryData,
  createCountryDataArray,
  getRandomCountry,
};
