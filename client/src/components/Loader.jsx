import React from "react";
import estilos from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={estilos.alinear}>
      <h1 className={estilos.fintexto}>Cargando ...</h1>

      <p className={estilos.fintexto}></p>
      <div className={estilos.fintexto}>
        <h1 className={estilos.preloader}> </h1>
      </div>
    </div>
  );
}
