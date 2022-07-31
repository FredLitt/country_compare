import axios, { AxiosResponse } from "axios"
import { CountryData, Datapoint } from "./types"

const getCountryData = async (country: string) => {
    const countryResponse: AxiosResponse = await axios.get(`https://restcountries.com/v3.1/name/${country}`)
    console.log(countryResponse.data[0], countryResponse.data[0].currencies)
    return countryResponse.data[0]
}

const formatCountryData = (countryData: any): CountryData => {
    return {
        country: countryData.name.common,
        flag: countryData.flags.svg,
        population: countryData.population,
        languages: Object.values(countryData.languages).toString(),//countryData.languages[Object.keys(countryData.languages)[0]],
        area: countryData.area,
        currency: countryData.currencies[Object.keys(countryData.currencies)[0]].name,
        capital: countryData.capital[0],
        region: countryData.region,
        subregion: countryData.subregion
    }
}

const createCountryDataArray = (firstCountryData: CountryData, secondCountryData: CountryData) : Datapoint[] => {
    const countryDataArray = []
    const dataKeys = Object.keys(firstCountryData)
    for (let i = 0; i < dataKeys.length; i++){
        const keyName = dataKeys[i].charAt(0).toUpperCase() + dataKeys[i].slice(1)
        const datapoint : Datapoint = {
        key: keyName,
        firstCountry: Object.values(firstCountryData)[i],
        secondCountry: Object.values(secondCountryData)[i]}
        countryDataArray.push(datapoint)
}
return countryDataArray
}

const getRandomCountry = async () => {
    const allCountries = await axios.get("https://restcountries.com/v3.1/all")
    const randomIndex = Math.floor(Math.random() * allCountries.data.length)
    const randomCountryName: string = allCountries.data[randomIndex].name.common
    return randomCountryName
}

export { getCountryData, formatCountryData, createCountryDataArray, getRandomCountry }