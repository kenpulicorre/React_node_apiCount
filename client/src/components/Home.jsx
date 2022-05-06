import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import estilos from "./Home.module.css";
import {
  getActivities,
  orderAscDes,
  orderMaxMinPobla,
  filterByContinent,
  filterByActivity,
  restartDetalle,
} from "../actions/index.js";
import getCountries from "../actions/index";
import Paginado from "./Paginado";
import Card from "./Card";
import SearchBar from "./SearchBar";
export default function Home(params) {
  //mapdispatchtoprops
  const dispatch = useDispatch();
  const { id } = useParams(); //foma 2 con el hook useparams

  //mapstatetoprops
  const allCountries = useSelector((state) => state.todosCountries);
  const r1 = allCountries;

  console.log("paises 10----------", r1[1]);

  const allActivities = useSelector((state) => state.activities);
  // const r = allCountries.map((e) => e[0].name);
  // console.log("desde home allcountries.name", r);
  // console.log("desde home activities", allActivities);
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
    dispatch(restartDetalle());
  }, [dispatch]); //[] =1sola vez,[state]=cada state ejecuta

  //------------funciones internas----------//
  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
    alert("Se cargara paises");
  }
  function handleOrder(event) {
    event.preventDefault();
    setActualpage(1);
    dispatch(orderAscDes(event.target.value));
    setOrder(`se ordeno${event.target.value}`);
  }
  //"""""
  function handleOrderPobla(event) {
    event.preventDefault();
    dispatch(orderMaxMinPobla(event.target.value));
    setOrder(`se ordeno${event.target.value}`);
    setActualpage(1);
  }

  //-------
  function onSelContinent(event) {
    console.log("event.target.name---", event.target.name);
    console.log("event.target.value---", event.target.value);
    dispatch(filterByContinent(event.target.value));
  }
  function onSelActivities(event) {
    console.log("event.target.name---", event.target.name);
    console.log("event.target.value---", event.target.value);
    dispatch(filterByActivity(event.target.value));
    setActualpage(1);
  }

  //---set paginado
  const setPaginado = async (nPage) => {
    setActualpage(nPage);
    if (nPage > 1) {
      setPaisByPage(10);
    } else {
      setPaisByPage(9);
    }
    // setOrder("actuliza");
    //seleccionar cuontries de ini a fin
  };
  //---fin set paginado

  //---setPaginaConBotton
  const setPaginaConBotton = (e) => {
    let cont = actualPage + e;
    if (cont < 1) {
      cont = 1;
    }
    setPaginado(cont);
  };
  //---fin setPaginaConBotton

  //---onHandleChange
  // const onHandleChange = (e) => {
  //   setName(e.target.value.toLowerCase());
  //   console.log("valor de serachbar", e.target.value);
  //   console.log("name de serachbar", e.target.name);
  // };
  //----fin onHandleChange

  // const handleSubmit = (e) => {
  //   console.log(
  //     `auqi se despacha la xion que recive el name: ${name}y busca en el back`
  //   );
  //   dispatch(getNameCountry(name));
  //   console.log("quiero saber ahora los paises", allCountries);
  // };
  //------------fin funciones internas----------//

  // let ff = paisToShow?.map((el) => {
  //   return {
  //     name: el.name,
  //     img_flag: el.img_flag,
  //     continent: el.continent,
  //   };
  // });
  // let hi = paisToShow[0];

  // console.log("aquii+++++++++++", ff[0]);
  // console.log("aquii+++++++++++ppp", hi);

  return (
    <div>
      <div>hola desde el detalle el id es: {id}</div>
      <h1 className={estilos.title}>¡MANIFIESTA TU PAIS!</h1>
      {/* botones y search------ */}
      <div className={estilos.botonsysearch}>
        <p className={estilos.botonesIniciales}>
          <Link to="/country" className={estilos.crear_pais}>
            crear pais
          </Link>
          <button
            onClick={(e) => handleClick(e)}
            className={estilos.crear_pais}
          >
            Recargar Paises
          </button>
        </p>
        {/* serach */}
        <SearchBar />
        {/* <p>
          <button className={estilos.button} onClick={(e) => handleSubmit()}>
            searchbar
          </button>
          <input
            type="text"
            placeholder="Digite pais"
            value={name}
            onChange={(e) => onHandleChange(e)}
          />
        </p> */}
      </div>
      {/* fin botones y search------ */}
      {/* filtros------------------------- */}
      <div className={estilos.Contenedor_filtro}>
        {/* ordenar por alfabeto */}
        <div>
          <h3>ordenar por alfabeto</h3>
          <select name="alfabeto" size="1" onChange={(e) => handleOrder(e)}>
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
            onChange={(e) => handleOrderPobla(e)}
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
            <option value="All">Todos</option>
            <option value="Antarctica">Antartica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Africa">Africa</option>
            <option value="North America">Norte America</option>
            <option value="South America">Sur America</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        {/* Filtrar por Acividades */}
        <div>
          <h3>Filtrar por Acividades</h3>
          <select name="" size="1" onChange={(e) => onSelActivities(e)}>
            <option value="All">Todas</option>
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
        setPaginaConBotton={setPaginaConBotton}
      />
      {/* Paginado------------------------- */}
      {/* Card------------------------- */}
      <div>
        
        {/* {paisToShow?.map((el) => {
          return (
            <div>
              <p></p>
              <h1> {el.name}</h1>
              <img src={el.img_flag} alt="" />
              <h2>{el.continent}</h2>
            </div>
            // name: el.name,
            // img_flag: el.img_flag,
            // continent: el.continent,
          );
        })} */}
      </div>
      <Card paisToShow={paisToShow} />
      {/* fin de Card------------------------- */}
    </div>
  );
}
