import React from "react";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import estilos from "./SearchBar.module.css";
import { getNameCountry } from "../actions/index.js";

export default function SearchBar(params) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const handleSubmit = () => {
    dispatch(getNameCountry(name));
    setName("");
  };
  const onHandleChange = (e) => {
    setName(e.target.value.toLowerCase());
  };

  return (
    <div className={estilos.botonsysearch}>
      <p>
        <input
          type="text"
          placeholder="Digite pais"
          value={name}
          onChange={(e) => onHandleChange(e)}
        />
        <button className={estilos.button} onClick={(e) => handleSubmit(e)}>
          searchbar
        </button>
      </p>
    </div>
  );
}
