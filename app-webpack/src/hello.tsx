import React from "react";

export const Hello = () => {
  return (
    <div>
      <h1>Hola desde React !!</h1>
      <p>Ejecutando entorno {process.env.ENVIRONMENT}</p>      
    </div>
  )
}