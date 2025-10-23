import React from "react";
import "./app.css";
import { Saludo } from "./components/saludo.jsx";
import { Routes, Route } from "react-router";
import { HomeScrean } from "./screan/HomeScrean.jsx";
import LoginScreen from "./screan/LoginScrean.jsx";
import RegisterScrean from "./screan/RegisterScrean.jsx";
import { Auth_middleware } from "./midelware/Auth_midelware.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route element={<Auth_middleware />}>
          <Route path="/home" element={<HomeScrean />} />
        </Route>
        <Route path="/register" element={<RegisterScrean />} />
      </Routes>
    </div>
  );
}

export default App;
