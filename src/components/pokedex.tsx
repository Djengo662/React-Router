import {useState, useEffect} from 'react';
import CreateCard from './card';
import CreateButton from './card-btn';
import { NavLink, Outlet } from 'react-router';


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
    type: string;
    classColor: string; 
  }
  
  interface Type {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }

  function GetPokemon () {
    const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  
    function loadPokemonUrl(num1: number) {
      const limit = 20;
      const newPath = "https://pokeapi.co/api/v2/pokemon?offset=" + num1 + "&limit=" + limit;
      setUrl(newPath);
    }
  
    useEffect(() => {
      fetchData();
    }, [url]);

    async function fetchData() {
        const response = await fetch(url);
        const data: Data = await response.json();
    
        const pokemonList = await Promise.all(
          data.results.map(async (poke) => {
            const pokeResponse = await fetch(poke.url);
            const pokeData: Img = await pokeResponse.json();
            const classColor = getTypeColor(pokeData.types[0].type.name);
            return {
              name: poke.name,
              url: poke.url,
              imgUrl: pokeData.sprites.other.dream_world.front_default,
              type: classColor, 
              classColor: classColor
            };
          })
        );
    
        setAllPokemon(pokemonList);
    
      }

      function getTypeColor(type: string) {
        switch (type) {
          case "fire": return "red";
          case "water": return "blue";
          case "grass": return "green";
          case "electric": return "yellow";
          default: return "gray";
        }
      }

      return (
        <div className="product-container">
          <NavLink to="/">
           <h2>Dashboard</h2>
        </NavLink>
        <Outlet />
          <div className="button-container">
            <CreateButton onClick={() => loadPokemonUrl(0)} pokeName={"1 - 20"} />
            <CreateButton onClick={() => loadPokemonUrl(21)} pokeName={"21 - 40"} />
            <CreateButton onClick={() => loadPokemonUrl(41)} pokeName={"41 - 60"} />
            <CreateButton onClick={() => loadPokemonUrl(61)} pokeName={"61 - 80"} />
            <CreateButton onClick={() => loadPokemonUrl(81)} pokeName={"81 - 100"} />
            <CreateButton onClick={() => loadPokemonUrl(101)} pokeName={"101 - 120"} />
            <CreateButton onClick={() => loadPokemonUrl(121)} pokeName={"121 - 151"} />
          </div>
    
          <div className="pokemon-list">
            {allPokemon.map((pokemon, index) => (
              <CreateCard key={index} imgSrc={pokemon.imgUrl} imgAltTitle={pokemon.name} title={pokemon.name} classColor={pokemon.classColor} />
            ))}
          </div>
        </div>
      );
          
  }

  export default GetPokemon;