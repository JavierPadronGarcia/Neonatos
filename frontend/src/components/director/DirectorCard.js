import { Button } from "antd";
import './DirectorCard.css';

function DirectorCard(props) {

  const director = props.director;

  if (director.isDirector) {
    return (
      <item className="director-card">
        <span>{director.username}</span>
        <span>Director asignado</span>
      </item>
    );
  }

  return (
    <item className="director-card">
      <span>{director.username}</span>
      <Button onClick={() => props.notifyAssign(director.id)}>Asignar</Button>
    </item>
  )
}

export default DirectorCard;