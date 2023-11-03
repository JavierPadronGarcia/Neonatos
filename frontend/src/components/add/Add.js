import { useNavigate } from "react-router-dom";

function Add(props) {

  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(props.link)}>
      <img src="/assets/icons/add.svg" alt={props.alt} />
    </div>
  );
}

export default Add;