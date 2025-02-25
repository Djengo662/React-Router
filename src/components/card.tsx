import { ReactElement } from "react";
import { FaFire } from "react-icons/fa";
import { GiHighGrass, GiStoneStack } from "react-icons/gi";
import { IoIosWater } from "react-icons/io";
import { MdElectricBolt } from "react-icons/md";

interface CardProps {
  imgSrc: string;
  imgAltTitle: string;
  title: string;
  classColors: string[];
}

interface PokeIcon {
  type: string;
  icon: ReactElement;
}


function CreateCard({ imgSrc, imgAltTitle, title, classColors }: CardProps) {
  const pokeIcons: PokeIcon[] = [
    { type: "green", icon: <GiHighGrass size={"2rem"}/>},
    { type: "red", icon: <FaFire size={"2rem"}/>},
    { type: "gray", icon: <GiStoneStack size={"2rem"}/>},
    { type: "yellow", icon: <MdElectricBolt size={"2rem"}/>},
    { type: "blue", icon: <IoIosWater size={"2rem"}/> },
  ];
  
  function GetIconForPokemonType(type: string) {
    const types = pokeIcons.find((x) => x.type === type)
    return types?.icon
  }
  return (
    <div className="single-card">
      <div className="img-div">
        <img src={imgSrc} alt={imgAltTitle} />
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {classColors.map((x) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: x,
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
              }}
            >
              <div>{GetIconForPokemonType(x)}</div>
              {/* {GetIconForPokemonType("")} */}
            </div>
          ))}
        </div>
        <h3>{title}</h3>
      </div>
    </div>
  );
}

export default CreateCard;
