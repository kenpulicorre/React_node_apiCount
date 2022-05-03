import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import estilos from "./Home.module.css";
import { getActivities } from "../actions/index.js";
import getCountries from "../actions/index";
import Paginado from "./Paginado";
export default function Home(params) {
  //mapdispatchtoprops
  const dispatch = useDispatch();
  //mapstatetoprops
  const allCountries = useSelector((state) => state.todosCountries);
  const r1 = allCountries;

  console.log("paises 10----------", r1[1]);

  const allActivities = useSelector((state) => state.activities);
  // const r = allCountries.map((e) => e[0].name);
  // console.log("desde home allcountries.name", r);
  console.log("desde home activities", allActivities);
  //------------estados locales----------//
  const [order, setOrder] = useState("");
  const [actualPage, setActualpage] = useState(1);
  const [paisByPage, setPaisByPage] = useState(9);

  //-----------
  console.log("paginaactual es", actualPage);
  let ini, fin, paisToShow;

  if (actualPage === 1) {
    console.log("entor al if =1 es", actualPage);
    const countriesPage = paisByPage;
    fin = actualPage * countriesPage;
    ini = fin - countriesPage;
    paisToShow = allCountries.slice(ini, fin);
    console.log("paises a mostrar", paisToShow);
  } else {
    console.log("entor al if mayor a 1 es", actualPage);
    const countriesPage = paisByPage;
    // const fin = actualPage * countriesPage;
    fin = actualPage * countriesPage - 1;
    ini = fin - countriesPage;
    paisToShow = allCountries.slice(ini, fin);
    console.log("paises a mostrar", paisToShow);
  }

  //------------estados locales----------//

  //------------funciones internas----------//
  //cuando el componente se monta traer pokes
  useEffect(() => {
    console.log("---Se ejecuto use effect en componente Home--");
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]); //[] =1sola vez,[state]=cada state ejecuta

  //------------funciones internas----------//

  function onSelContinent(event) {
    console.log("event.target.name---", event.target.name);
    console.log("event.target.value---", event.target.value);
  }
  function onSelActivities(event) {
    console.log("event.target.name---", event.target.name);
    console.log("event.target.value---", event.target.value);
  }

  //---set paginado
  const setPaginado = async (nPage) => {
    setActualpage(nPage);
    if (nPage > 1) {
      setPaisByPage(10);
    } else {
      setPaisByPage(9);
    }
    setOrder("actuliza");
    //seleccionar cuontries de ini a fin
  };
  //------------funciones internas----------//

  return (
    <div>
      <h1 className={estilos.title}>¡MANIFIESTA TU PAIS!</h1>
      {/* botones y search------ */}
      <div className={estilos.botonsysearch}>
        <p className={estilos.botonesIniciales}>
          <Link to="/country" className={estilos.crear_pais}>
            crear pais
          </Link>
          <button className={estilos.crear_pais}>Recargar pokemons</button>
        </p>
        <p>
          <button className={estilos.crear_pais}> searchbar</button>
        </p>
      </div>
      {/* fin botones y search------ */}
      {/* filtros------------------------- */}
      <div className={estilos.Contenedor_filtro}>
        {/* ordenar por alfabeto */}
        <div>
          <h3>ordenar por alfabeto</h3>
          <select name="alfabeto" size="1" onChange={(e) => onSelActivities(e)}>
            <option value="Asc">Ascendente</option>
            <option value="Des">Descendente</option>
          </select>
        </div>
        {/* ordenar por poblacion */}

        <div>
          <h3>ordenar por poblacion</h3>
          <select
            name="poblacion"
            size="1"
            onChange={(e) => onSelActivities(e)}
          >
            <option value="max">mayor poblacion</option>
            <option value="min">menos poblacion</option>
          </select>
        </div>
        {/* filtrar por continente */}
        <div>
          <h3>filtrar por continente</h3>
          <select
            name="continente"
            size="1"
            onChange={(e) => onSelContinent(e)}
          >
            <option value="All">Continentes</option>
            <option value="Asi">Asia</option>
            <option value="Eur">Europa</option>
            <option value="Afr">Africa</option>
            <option value="NAm">Norte America</option>
            <option value="SAm">Sur America</option>
            <option value="Oce">Oceania</option>
          </select>
        </div>
        {/* Filtrar por Acividades */}
        <div>
          <h3>Filtrar por Acividades</h3>
          <select name="" size="1" onChange={(e) => onSelActivities(e)}>
            <option value="All">Actividades</option>
            {allActivities?.map((e) => (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* fin filtros------------------------- */}
      <br />
      {/* <nav> */}

      {/* <nav>
        <ul className={estilos.uli}>
          <li>
            <a onClick={() => setPaginado(1)}>1</a>
          </li>
          <li>
            <a onClick={() => setPaginado(2)}>2</a>
          </li>
          <li>
            <a onClick={() => setPaginado(3)}>3</a>
          </li>
        </ul>
      </nav> */}

      {/* </nav> */}

      {/* Paginado------------------------- */}
      <Paginado
        setPaginado={setPaginado}
        allCountries={allCountries}
        paisByPage={paisByPage}
        actualPage={actualPage}
      />
      {/* Paginado------------------------- */}
    </div>
  );
}
