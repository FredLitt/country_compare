import { Datapoint } from './types'

export const renderData = (data: Datapoint) => {
    if (data.key === "Flag"){
      return (
        <>
          <td><img src={data.firstCountry} alt=""/></td>
          <td><img src={data.secondCountry} alt=""/></td>
        </>
      )
    }
    if (data.key === "Population"){
      return (
        <>
          <td>{data.firstCountry.toLocaleString()}</td>
          <td>{data.secondCountry.toLocaleString()}</td>
        </>
      )
    } 
    if (data.key === "Area"){
      return (
        <>
          <td>{data.firstCountry.toLocaleString()} km<sup>2</sup></td>
          <td>{data.secondCountry.toLocaleString()} km<sup>2</sup></td>
        </>
      )
    } 
    return (
      <>
        <td>{data.firstCountry}</td>
        <td>{data.secondCountry}</td>
      </>
    )
  }
  