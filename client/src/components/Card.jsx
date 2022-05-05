import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import estilos from "./Card.module.css";
export default function Card(params) {
  return (
    <div className={estilos.divGlobal}>
      {/* {(console.log("aquii+++++++++++"), paisToShow)} */}
      {params.paisToShow?.map((el) => {
        return (
          <Fragment key={el.id}>
            <Link to={el.id} className={estilos.contenedor_1country}>
              <div>
                <h1> {el.name}</h1>
                <img src={el.img_flag} alt="" />
                <p>continente: {el.continent}</p>
              </div>
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
