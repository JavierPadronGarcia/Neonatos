import { useNavigate } from "react-router-dom";
import './GoBack.css';

function GoBack(props) {

  const navigate = useNavigate();

  const link = props.link;
  const alt = props.alt;

  return (
    <div className='return-arrow' onClick={() => navigate(link)}>
      <img src='/assets/icons/arrow-left.svg' alt={alt} />
    </div>
  );
}

export default GoBack;