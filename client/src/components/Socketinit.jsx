import React from "react";
import { useEffect, useState } from "react";
import socket from "./Socket";
import { useDispatch } from "react-redux";
import estilos from "./Home.module.css";
import Sochat from "./Sochat";
export default function SearchBar(params) {
  //-----------
  const [nombre, setNombre] = useState("");
  const [text, setText] = useState("");
  const [mensajesw, setMensajesw] = useState([]);
  const [registrado, setRegistrado] = useState(false);
  //-----------
  //-----------
  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };
  //-----------
  const onClickk = () => {
    socket.emit("mensajew", text);
    setText("");
  };
  //-------
  useEffect(() => {
    socket.on("mensajesw", (text, socketid) => {
      setMensajesw([...mensajesw, text]);
      console.log("recibio del back socketid", socketid);
      console.log("mensajesw", mensajesw);
      console.log("recibio del back text", text);
    });

    // return () => {
    //   socket.off();
    // };
  }, [mensajesw]);
  //-------

  return (
    <div>
      <h1> HI from socket initi</h1>
      <div className={estilos.todo}>
        <div>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={(e) => onClickk()}>añadir</button>
          <p className={estilos.bg_black}>
            {mensajesw.map((e, i) => (
              <div key={i}>{e.text}</div>
            ))}
          </p>
        </div>
        {!registrado && (
          <form onSubmit={registrar}>
            <label htmlFor="">Introduzca su nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <button>Ir al chat</button>
          </form>
        )}

        {registrado && <Sochat nombre={nombre} />}
      </div>
    </div>
  );
}
