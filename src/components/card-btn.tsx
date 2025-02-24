interface ButtonProps {
  pokeName: string;
  onClick: () => void;
}

function CreateButton(props: ButtonProps) {
  return (
    <button className="list-btn" onClick={props.onClick}>
      {props.pokeName}
    </button>
  );
}

export default CreateButton;


