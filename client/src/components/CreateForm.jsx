import React, { Fragment } from "react";
// hooks
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import estilos from "./CreateForm.module.css";
import getCountries, { postCountry } from "../actions/index.js";
//-----------------------------------------------
export default function CreateForm(params) {
  //---estados locales
  //----- hooks
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.todosCountries);
  //---
  useEffect(() => {
    dispatch(getCountries());
    console.log("entrada", input.name);
  }, []);

  // const paises_name = allCountries.map((e) => e.name);

  //
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    season: "",
    duration: "",
    country: [],
    countrye: [],
  });
  //----- fin hooks

  //--------------handleOnChange-----------------
  function handleOnChange(e) {
    // console.log("input", input);
    e.preventDefault();
    // console.log(`se digito en ${e.target.name}`);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    // setErrors(handleValidacion(input));
    setErrors(handleValidacion({ ...input, [e.target.name]: e.target.value }));
    // console.log(input);
  }
  //-------------handleOnOptionsSelect-----------------
  function handleOnOptionsSelect(e) {
    e.preventDefault();

    // console.log("**********el pais name\n", e.target.name);
    // console.log("**********el value\n", e.target.value);
    console.log("errors", errors);
    // console.log(`se digito en ${e.target.name}`);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(handleValidacion({ ...input, [e.target.name]: e.target.value }));
  }
  //-------------handleOnOptionsSelectC-----------------
  function handleOnOptionsSelectC(e) {
    e.preventDefault();

    // console.log("**********el pais name\n", e.target.name);
    // console.log("**********el value\n", e.target.value);
    // console.log("input", input);
    // console.log(`se digito en ${e.target.name}`);
    console.log("encontro el pais en estado????:", input.country);
    console.log("encontro el value????:", e.target.value);
    let target = e.target.value;
    let verificarpais = null;
    if (input.country.length > 0) {
      verificarpais = input.country.find((e) => e === target)
        ? input.country.find((e) => e === target)
        : "";
    }

    console.log("encontro el pais????:", verificarpais);
    if (!verificarpais) {
      setInput({
        ...input,
        ["countrye"]: [...input.countrye, e.target.value],
        ["country"]: [...input.country, e.target.value],
      });
    } else {
      alert("el pais ya se digito");
    }

    setErrors(handleValidacion({ ...input, [e.target.name]: e.target.value }));
  }
  //-------------handleOnSubmit-----------------

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(`lo que voy a despachar es lo sigueinte${input}`, input);
    //--sin digitar nada
    if (input.name == "") {
      setErrors(handleValidacion({ ...input, ["name"]: "" }));
      return alert("debe de agregar cada valor!!");
    } else {
      dispatch(postCountry(input));
      alert("se creo actividad...");
    }
    //--fin sin digitar nada

    setInput({
      name: "",
      difficulty: "",
      season: "",
      duration: "",
      country: [],
      countrye: [],
    });
  }

  //-------------validaciones-----------------
  let alfabetico = /^[a-z]+$/;
  let numerico = /^[0-9]+$/;
  function handleValidacion(input) {
    let errors = {};
    //name---------------
    if (!input.name || !alfabetico.test(input.name)) {
      errors.name =
        "Solo se permite caracteres del alfabeto (a hata la z), no se permite vacio";
    } else if (
      //duration-----
      input.duration > 10 ||
      input.duration === "" ||
      !numerico.test(input.duration)
    ) {
      errors.duration = "Debe ser un valor entre 1 y 10";
    } else if (input.difficulty === "") {
      errors.difficulty = "Debe seleccionar la dificultad";
    } else if (input.season === "") {
      errors.season = "Debe seleccionar la estacion";
    } else if (input.country.length === 0) {
      errors.country = "Se debe seleccionar un pais";
    }
    return errors;
  }
  //-------------handleDelete-----------------

  function handleDelete(e) {
    console.log("dio click en delete elemento", e);
    let paisFin = input.country.filter((el) => el !== e);
    console.log("dio click en delete y el filtro es---", paisFin);

    setInput({
      ...input,
      ["countrye"]: paisFin,
      country: paisFin,
    });
    setErrors(handleValidacion({ ...input, country: paisFin }));
  }
  //-------------return-----------------

  return (
    <div>
      <h1 className={estilos.title}>Seccion de Creacion de Actividades</h1>
      <Link to="/home">
        <button className={estilos.boton}>VOLVER</button>
      </Link>

      <form
        action=""
        onSubmit={(e) => handleOnSubmit(e)}
        className={estilos.formulario}
      >
        {/* //------nombre ---------------------------------------*/}
        <div>
          <label htmlFor="">Nombre:</label>
          <input
            type="text"
            value={input.name} //si no coloco esto despues al crearse no deja limpiar el texto
            // value=""
            name="name"
            placeholder="Nombre..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.name && <p>{errors.name}</p>}
          </label>
        </div>{" "}
        {/* //-----------duration ---------------------------------------*/}
        <div>
          <label htmlFor="">Duracion (Horas):</label>
          <input
            type="text"
            value={input.duration}
            // value=""
            name="duration"
            placeholder="Duracion.."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {errors.duration && <p>{errors.duration}</p>}
          </label>
        </div>
        {/* //------dificultad ---------------------------------------*/}
        <div>
          <label htmlFor="">Dificultad:</label>

          <select
            name="difficulty"
            id=""
            onChange={(e) => handleOnOptionsSelect(e)}
          >
            <option value="">seleccione</option>
            <option value="1">Muy Baja</option>
            <option value="2">Baja</option>
            <option value="3">Intermedia</option>
            <option value="4">Alta</option>
            <option value="5">Muy Alta</option>
          </select>

          <label htmlFor="" className={estilos.error}>
            {errors.difficulty && <p>{errors.difficulty}</p>}
          </label>
        </div>
        {/* // ------season--------------------------------------- */}
        <div>
          <label htmlFor="">Estacion:</label>

          <select
            name="season"
            id=""
            onChange={(e) => handleOnOptionsSelect(e)}
          >
            <option value="">seleccione</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </select>

          <label htmlFor="" className={estilos.error}>
            {errors.season && <p>{errors.season}</p>}
          </label>
        </div>
        {/* //-----------Pais ---------------------------------------*/}
        <div>
          <label htmlFor="">Pais:</label>
          <select
            name="country"
            id=""
            onChange={(e) => handleOnOptionsSelectC(e)}
          >
            <option value="">Seleccione pais</option>
            {allCountries.map((el) => (
              <option key={el.id} value={el.name}>
                {el.name}
              </option>
            ))}
          </select>
          <label htmlFor="" className={estilos.error}>
            {errors.country && <p>{errors.country}</p>}
          </label>
          {/* --- */}
          <div className={estilos.formulariotypo}>
            {input.country.map((el) => (
              <div key={el}>
                {/* <p>{el}</p> */}
                <button
                  type="button"
                  onClick={() => handleDelete(el)}
                  className={estilos.fuente}
                >
                  x
                </button>
                <span>{el}</span>
                <p></p>
              </div>
            ))}
          </div>

          <div>
            {/* <button
              type="button"
              onClick={(e) => handleDelete(e.target.innerText)}
              className={estilos.fuente}
            >
              otro
            </button> */}
          </div>
          {/* --- */}
        </div>
        <button
          type="submit"
          className={estilos.boton}
          disabled={Object.keys(errors).length ? true : false}
        >
          Crear
        </button>
        {/* <select
          name="creaElimina"
          id=""
          onChange={(e) => handleOnOptionsSelect(e)}
        >
          <option value="c">crea</option>
          <option value="e">elimina</option>
        </select> */}
      </form>
    </div>
  );
}
