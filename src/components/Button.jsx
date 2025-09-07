import React from 'react'
const Button = ({title, onClick, isActive}) => {
  return (
    <div>
      <button
        className={`btn ${isActive ? 'btn--active' : ''}`}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  )
}
export default Button

