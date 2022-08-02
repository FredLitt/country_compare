import { AxiosResponse } from "axios";

type CountryResponse = AxiosResponse | "error";

interface CountryData {
  country: string;
  flag: string;
  languages: string;
  population: number;
  area: number;
  population_density: number;
  currency: string;
  capital: string;
  region: string;
  subregion: string;
  latlng: [number, number];
}

interface Datapoint {
  key: string;
  firstCountry: string;
  secondCountry: string;
}

type LatLong = [number, number];

export type { CountryResponse, CountryData, Datapoint, LatLong };
