import React from 'react'
const Button = ({title, onClick}) => {
  return (
    <div>
      <button
        className="btn"
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          maxWidth: "140px",
          minWidth: "80px",
          height: "30px",
          marginRight: "5px",
          backgroundColor: "#111411ee",
          color: "white",
          border: "1px solid #92bb6bff",
          borderRadius: "7px",
          cursor: "pointer"
        }}
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  )
}
export default Button

