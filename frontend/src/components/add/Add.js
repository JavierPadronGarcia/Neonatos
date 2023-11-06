import { useNavigate } from "react-router-dom";

function Add(props) {

  const navigate = useNavigate();
  const link = props.link;
  const alt = props.alt;

  return (
    <div onClick={() => navigate(link)}>
      <img src="/assets/icons/add.svg" alt={alt} />
    </div>
  );
}

export default Add;