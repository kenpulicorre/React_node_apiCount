import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getActivities, getCountryById } from "../actions/index.js";
import estilos from "./DetailCountry.module.css";

export default function DetailCountry(props) {
  const dispatch = useDispatch();
  const { id } = useParams(); //foma 2 con el hook useparams
  useEffect(() => {
    dispatch(getCountryById(id)); //foma 2 con el hook useparams
  }, [id, dispatch]);

  const paisInfoByIdi = useSelector((state) => state.detalle);

  let arreglo_actividades;
  console.log("las actividades son y:", paisInfoByIdi.activities);
  // console.log("esto es lo recivido cuando si recibe:", paisInfoByIdi.activities.length ); //pregunta
  if (paisInfoByIdi.name) {
    // console.log( "esto es lo recivido cuando si recibe:",paisInfoByIdi.activities.length );
    // console.log("sacando info id:", paisInfoByIdi.activities.id);
    arreglo_actividades = paisInfoByIdi.activities.map((e) => (
      <div key={e.id}>
        <li>Actividad: {e.name} </li>
        <li>Dificultad: {e.difficulty} </li>
        <li>Duracion: {e.duration} </li>
        <li>Estacion: {e.season} </li>
      </div>
    ));
  }

  return (
    <div>
      hola desde el detalle el id es:
      {id}
      <div>
        <li>Nombre del pais: {paisInfoByIdi.name}</li>
        <li>Codigo del pais: {paisInfoByIdi.id}</li>
        <li>Continente: {paisInfoByIdi.continent}</li>
        <li>Subregión: {paisInfoByIdi.subregion}</li>
        <li>Capital: {paisInfoByIdi.capital}</li>
        <li>Area: {paisInfoByIdi.area} Km2</li>
        <li>Poblacion: {paisInfoByIdi.people}</li>
        <img src={paisInfoByIdi.img_flag} alt="no hay imagen" />

        {paisInfoByIdi.activities && paisInfoByIdi.activities.length === 0 ? (
          <div>
            <h1>No se han creado actividades para este pais</h1>
          </div>
        ) : (
          <div className={estilos.container_actividades}>
            {arreglo_actividades}
          </div>
        )}
      </div>
    </div>
  );
}
