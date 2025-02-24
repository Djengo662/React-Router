interface CardProps {
  imgSrc: string;
  imgAltTitle: string;
  title: string;
  classColor: string;
}

function CreateCard({ imgSrc, imgAltTitle, title, classColor }: CardProps) {
  return (
    <div className="single-card">
      <div className="img-div">
        <img src={imgSrc} alt={imgAltTitle} />
      </div>
      <div>
        <h3 style={{ backgroundColor: classColor }}>
          {title}
        </h3>
      </div>
    </div>
  );
}

export default CreateCard;
