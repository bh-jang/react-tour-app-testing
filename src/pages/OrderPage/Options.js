import React from 'react'

export default function Options({ name }) {
  return (
    <fort>
        <input type="checkbox" id={``} />{" "}
        <label htmlFor={`${name} option`}>{name}</label>
    </fort>
  )
}
