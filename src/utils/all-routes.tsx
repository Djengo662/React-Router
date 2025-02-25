import Dashboard from "../components/dashboard";
import Pokedex from "../components/pokedex";
import WeatherForecast from "../components/weather";
import { MyRoute } from "../models/route";
import CurrencyExchange from "../views/currency-exchange";

export const AllRoutes: MyRoute[] = [
  { id: "dashboard", name: "Dashboard", path: "/", element: <Dashboard /> },
  {
    id: "weather",
    name: "Weather Data",
    path: "/weather",
    element: <WeatherForecast />,
  },
  {
    id: "pokedex",
    name: "Pokémon Dex Data",
    path: "/pokedex",
    element: <Pokedex />,
  },
  {
    id: "currency-exchange",
    name: "Currency Exchange",
    path: "/currency-exchange",
    element: <CurrencyExchange />,
  },
];
