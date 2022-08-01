interface CountryData {
  country: string;
  flag: string;
  languages: string;
  population: string;
  population_density: number;
  area: string;
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

export type { CountryData, Datapoint };
