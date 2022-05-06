import React, { Fragment } from "react";
import estilos from "./CreateForm.module.css";
import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { postCountry } from "../actions/index.js";
export default function CreateForm(params) {
  //---estados locales
  //----- hooks
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    season: "",
    duration: "",
    country: "",
  });

  //----- fin hooks

  //--------------handleOnChange
  function handleOnChange(e) {
    console.log("input", input);
    e.preventDefault();
    // console.log(`se digito en ${e.target.name}`);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    // console.log(`se digito en ${activity}`);
    // tengo wur cambiar un estado para poder enviar esa info al api y que se fuarde con el postt
    // llenar un estadoKC
    // console.log("errors", errors);
    // setInput({
    //   ...input,
    //   [e.target.name]: e.target.value,
    // });
    // setErrors(handleValidacion({ ...input, [e.target.name]: e.target.value }));
    // console.log(input);
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(`lo que voy a despachar es lo sigueinte${input}`, input);
    dispatch(postCountry(input));
  }

  return (
    <div>
      <form action="" onSubmit={(e) => handleOnSubmit(e)}>
        <hr />
        <hr />
        <hr />
        <hr />
        <div>
          <label htmlFor="">Nombre:</label>
          <input
            type="text"
            // value={input.name}
            // value=""
            name="name"
            placeholder="Nombre..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {/* {errors.life && <p>{errors.life}</p>} */}
            Aqui van los errores
          </label>
        </div>
        {/* //------dificultad */}
        <div>
          <label htmlFor="">Dificultad:</label>
          <input
            type="text"
            // value={input.difficulty}
            // value=""
            name="difficulty"
            placeholder="Dificultad..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {/* {errors.life && <p>{errors.life}</p>} */}
            Aqui van los errores
          </label>
        </div>
        {/* // ------season */}
        <div>
          <label htmlFor="">Estacion:</label>
          <input
            type="text"
            // value={input.season}
            // value=""
            name="season"
            placeholder="Estacion..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {/* {errors.life && <p>{errors.life}</p>} */}
            Aqui van los errores
          </label>
        </div>
        {/* //-----------duration */}
        <div>
          <label htmlFor="">Duracion:</label>
          <input
            type="text"
            // value={input.duration}
            // value=""
            name="duration"
            placeholder="Duracion.."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {/* {errors.life && <p>{errors.life}</p>} */}
            Aqui van los errores
          </label>
        </div>
        <div>
          <label htmlFor="">Pais:</label>
          <input
            type="text"
            // value={input.country}
            // value=""
            name="country"
            placeholder="Pais..."
            onChange={(e) => handleOnChange(e)}
          />
          <label htmlFor="" className={estilos.error}>
            {/* {errors.life && <p>{errors.life}</p>} */}
            Aqui van los errores
          </label>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
