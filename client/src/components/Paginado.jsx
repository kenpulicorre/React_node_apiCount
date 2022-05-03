import React from "react";
import estilos from "./Paginado.module.css";
export default function Paginado(params) {
  let paisByPage = params.paisByPage;
  let actualPage = params.actualPage;
  let allCountries = params.allCountries;
  let arregloNumeros = [];
  let max = 0;
  let blokTotales;
  console.log("arreglo de allCountries", allCountries.length);

  if (allCountries.length && allCountries.length < 9) {
    console.log("entro al 9");

    max = 1;
  } else if (allCountries.length > 9) {
    console.log("entro al mayor a 9");

    let bloqDeci = allCountries.length / 10;
    blokTotales = Math.ceil(bloqDeci, 1);
    max = 1 + blokTotales;
    console.log("entro al mayor a 9----");
  }

  for (let i = 0; i < max; i++) {
    arregloNumeros.push(i + 1);
  }

  console.log("arreglo de numeros", arregloNumeros);

  return (
    <nav>
      <ul className={estilos.uli}>
        {arregloNumeros.map((e) => {
          return (
            <li>
              <a onClick={() => params.setPaginado(e)}>{e}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
