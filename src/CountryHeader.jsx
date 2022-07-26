import React from 'react'

export default function CountryHeader({ country }) {
  return (
    <>
    <div className="name-flag-wrapper">
        <h1 className="country-name">{country.name}</h1>
        <img src={country.flag} alt="" />
    </div>
    </>
  )
}
