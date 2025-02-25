import { useEffect, useState } from "react";
import CreateCard from "./card";
import CreateButton from "./card-btn";

interface PokeData {
  name: string;
  url: string;
}

interface Data {
  results: PokeData[];
}

interface DreamWorld {
  front_default: string;
}

interface Other {
  dream_world: DreamWorld;
}

interface Sprites {
  other: Other;
}

interface Img {
  sprites: Sprites;
  types: Type[];
}

interface Pokemon {
  name: string;
  url: string;
  imgUrl: string;
  type: string[];
  classColor: string[];
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

function GetPokemon() {
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
  );
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

  function loadPokemonUrl(num1: number) {
    const limit = 20;
    const newPath =
      "https://pokeapi.co/api/v2/pokemon?offset=" + num1 + "&limit=" + limit;
    setUrl(newPath);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  async function fetchData() {
    const response = await fetch(url);
    const data: Data = await response.json();

    const pokemonList: Pokemon[] = await Promise.all(
      data.results.map(async (poke) => {
        const pokeResponse = await fetch(poke.url);
        const pokeData: Img = await pokeResponse.json();
        const classColors = getTypeColors(pokeData.types);

        if (pokeData.types.length > 1) {
          console.log(classColors);
        }

        return {
          name: poke.name,
          url: poke.url,
          imgUrl: pokeData.sprites.other.dream_world.front_default,
          type: classColors,
          classColor: classColors,
        };
      })
    );

    setAllPokemon(pokemonList);
  }

  function getTypeColors(type: Type[]) {
    const colorClassArray = [];

    for (const pokeTyp of type) {
      switch (pokeTyp.type.name) {
        case "fire":
          colorClassArray.push("red");
          break;
        case "water":
          colorClassArray.push("blue");
          break;
        case "grass":
          colorClassArray.push("green");
          break;
        case "electric":
          colorClassArray.push("yellow");
          break;
        default:
          colorClassArray.push("gray");
          break;
      }
    }

    return colorClassArray;
  }

  return (
    <div className="product-container">
      <div className="button-container">
        <CreateButton onClick={() => loadPokemonUrl(0)} pokeName={"1 - 20"} />
        <CreateButton onClick={() => loadPokemonUrl(21)} pokeName={"21 - 40"} />
        <CreateButton onClick={() => loadPokemonUrl(41)} pokeName={"41 - 60"} />
        <CreateButton onClick={() => loadPokemonUrl(61)} pokeName={"61 - 80"} />
        <CreateButton
          onClick={() => loadPokemonUrl(81)}
          pokeName={"81 - 100"}
        />
        <CreateButton
          onClick={() => loadPokemonUrl(101)}
          pokeName={"101 - 120"}
        />
        <CreateButton
          onClick={() => loadPokemonUrl(121)}
          pokeName={"121 - 151"}
        />
      </div>

      <div className="pokemon-list">
        {allPokemon.map((pokemon, index) => (
          <CreateCard
            key={index}
            imgSrc={pokemon.imgUrl}
            imgAltTitle={pokemon.name}
            title={pokemon.name}
            classColors={pokemon.classColor}
          />
        ))}
      </div>
    </div>
  );
}

export default GetPokemon;
