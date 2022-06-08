import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import SocketInit from "./components/Socketinit";
import CreateForm from "./components/CreateForm";
import DetailCountry from "./components/DetailCountry";
import img from "./images/bandera6.gif";
import socket from "./components/Socket.js";
function App() {
  // let x = "kenneth";
  // let y = "puliche";
  // socket.emit("conectado", x, y, "prueba de envio");
  // socket.on("conectadoz", (a, b) => {
  //   console.log(
  //     `have been received a message from back, but return ${a}  y ${b}`
  //   );
  // });
  return (
    <BrowserRouter>
      <div className="App">
        <div className="imagen">
          <img src={img} alt="" />
          <img src={img} alt="" />
          <img src={img} alt="" />
          <img src={img} alt="" />
        </div>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/socketinit" element={<SocketInit />}></Route>
          <Route path="/home/:id" element={<DetailCountry />} />

          <Route path="/country" element={<CreateForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
