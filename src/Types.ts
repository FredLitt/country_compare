interface CountryData {
    country: string,
    flag: string,
    population: string,
    languages: string,
    area: string,
    currency: string,
    capital: string,
    region: string,
    subregion: string
}

interface Datapoint {
    key: string,
    firstCountry: string,
    secondCountry: string 
}
  
export type { CountryData, Datapoint }