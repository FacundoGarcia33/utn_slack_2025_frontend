import React from "react";

export let Saludo = ({ Name, apellido }) => {
  return (
    <div>
      <h1>
        Hola soy {Name} {apellido}
      </h1>
    </div>
  );
};
