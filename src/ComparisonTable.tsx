import React from 'react'
import { Datapoint } from './types'

export default function ComparisonTable({countryData} : any) {

    const findPopulationDensity = (countryData : Datapoint[]) => {
        // const populationData = countryData.find(data => data.key === "Population")
        // const areaData = countryData.find(data => data.key === "Area")
        // if (!populationData || !areaData) return
        // const countryAPopulationDensity = Math.round(parseInt(populationData.firstCountry) / parseInt(areaData.firstCountry))
        // console.log(countryAPopulationDensity)
        //return populationDensity
    }
    findPopulationDensity(countryData)
  return (
    <table>
       <tbody>

        </tbody>
    </table>
  )
}
