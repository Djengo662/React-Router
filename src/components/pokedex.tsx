import { useEffect, useState } from "react";
import CreateCard from "./card";

export interface PokeData {
  name: string;
  url: string;
}

interface PokeApiResponse {
  count: number;
  next: string;
  previous: string | null;
  results: PokeData[];
}

function GetPokemon() {
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [allPokemon, setAllPokemon] = useState<PokeData[]>([]);
  const btnContainer = [
    { btnText: "1 - 20", btnStart: 0 },
    { btnText: "21 - 40", btnStart: 21},
    { btnText: "41 - 60", btnStart: 41},
    { btnText: "61 - 80",btnStart: 61},
    { btnText: "81 - 100",btnStart: 81},
    { btnText: "101 - 120",btnStart: 101},
    { btnText: "121 - 151",btnStart: 121},
  ];

  function loadPokemonUrl(num1: number) {
    const limit = 20;
    const newPath =
      "https://pokeapi.co/api/v2/pokemon?offset=" + num1 + "&limit=" + limit;
    setUrl(newPath);
  }

  useEffect(() => {
    fetchData();
  }, [url]);


  //Loading Pokemons
  async function fetchData() {
    const response = await fetch(url);
    const data: PokeApiResponse = await response.json();
    setAllPokemon(data.results);
  }

  return (
    <div className="product-container">
      <div className="button-container">
        {btnContainer.map((x) => (
          <button key={x.btnStart} onClick={() => loadPokemonUrl(x.btnStart)}>{x.btnText}</button>
        ))}
      </div>
      <div className="pokemon-list">
          <CreateCard
          pokemon = {allPokemon}
          />
      </div>
    </div>
  );
}

export default GetPokemon;
