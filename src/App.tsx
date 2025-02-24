import "./App.css";
import WeatherForecast from "./components/weather";
import GetPokemon from "./components/pokedex";
import { Routes, Route } from "react-router";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/components/weather" element={<WeatherForecast />} />
        <Route path="/components/pokedex" element={<GetPokemon />} />
      </Routes>
    </div>
  );
}

export default App;
