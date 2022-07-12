import React from 'react'

export default function Options({ name, updateItemCount }) {

  const handleChange = (e) => {
    const checked = e.target.checked;
    updateItemCount(name, checked ? 1 : 0)
  }

  return (
    <fort>
        <input type="checkbox" onChange={handleChange}  id={`${name} option`} />{" "}
        <label htmlFor={`${name} option`}>{name}</label>
    </fort>
  )
}
