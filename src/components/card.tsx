import { ReactElement, useEffect, useState } from "react";
import { FaFire } from "react-icons/fa";
import { GiHighGrass, GiStoneStack } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";
import { PokeData } from "./pokedex";

interface Pokemon {
  name: string;
  url: string;
  imgUrl: string;
  type: string[];
  classColor: string[];
  icon: ReactElement[];
}

interface PokeIcon {
  type: string;
  icon: ReactElement;
}

interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

function CreateCard({ pokemon }: { pokemon: PokeData[] }) {
  const [pokeImg, setPokeImg] = useState<Pokemon[]>();

  const pokeIcons: PokeIcon[] = [
    { type: "green", icon: <GiHighGrass size="2rem" /> },
    { type: "red", icon: <FaFire size="2rem" /> },
    { type: "gray", icon: <GiStoneStack size="2rem" /> },
    { type: "yellow", icon: <MdElectricBolt size="2rem" /> },
    { type: "blue", icon: <IoIosWater size="2rem" /> },
  ];

  function GetIconForPokemonType(types: Type[]) {
    const matches: ReactElement[] = [];
    const typesToColor = getTypeColors(types);
  
    typesToColor.forEach(color => {
      const matchedIcon = pokeIcons.find(x => x.type === color);
      
      if (matchedIcon) {
        matches.push(matchedIcon.icon);
      }
    });
  
    return matches;
  }
  
  async function getPokeUrl() {
    const pokeDataArray: Pokemon[] = [];
    for (const poke of pokemon) {
      const response = await fetch(poke.url);
      const data = await response.json();

      const newPokemon: Pokemon = {
        name: poke.name,
        url: poke.url,
        imgUrl: data.sprites.other.dream_world.front_default,
        type: data.types.map((typeObj: any) => typeObj.type.name),
        classColor: getTypeColors(data.types),
        icon: GetIconForPokemonType(data.types),
      };

      pokeDataArray.push(newPokemon);
    }
    setPokeImg(pokeDataArray);
  }

  function getTypeColors(type: Type[]) {
    const colorClassArray: string[] = [];

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

  useEffect(() => {
    getPokeUrl();
  }, [pokemon]);

  return (
    <div className="pokedex">
      {pokeImg?.map((x) => (
        <div key={x.name} className="single-card">
          <div className="img-div">
            <img src={x.imgUrl} alt={x.name} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
            {x.icon.map((icon, index) => (
              <div key={index} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: x.classColor[index],
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",}}>
                {icon} 
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "10px",
              borderRadius: "5px",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            {x.name}
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default CreateCard;
