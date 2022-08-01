interface CountryData {
  country: string;
  flag: string;
  languages: string;
  population: string;
  area: string;
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

export type { CountryData, Datapoint };
