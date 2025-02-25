interface CardProps {
  imgSrc: string;
  imgAltTitle: string;
  title: string;
  classColors: string[];
}

// function GetIconForPokemonType(type: string) {
//   // TODO:
// }

function CreateCard({ imgSrc, imgAltTitle, title, classColors }: CardProps) {
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
