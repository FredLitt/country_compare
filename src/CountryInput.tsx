import React from 'react'

export default function CountryInput({ number, value, countries, setInput }: any) {

  return (
    <input className="country-name-input" value={value} onChange={setInput} type="text" placeholder={`Enter ${number} country`} />
  )
}
