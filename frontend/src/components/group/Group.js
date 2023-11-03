import './Group.css';
import { useNavigate } from 'react-router-dom';

function Group(props) {

  const navigate = useNavigate();

  const name = props.name;

  return (
    <article className='group-component'>
      <header className='group-component-header'>
        <img src="/assets/icons/trash-can.svg" alt="" />
        <p>{name}</p>
        <img src="/assets/icons/pencil.svg" alt="" />
      </header>
      <main className='group-component-main'>
        <p>cantidad de profesores</p>
        <p>cantidad de estudiantes</p>
      </main>
      <footer className='group-component-footer'>
        <button onclick={() => navigate(`/groups/details/${props.ident}`)}>
          Ver detalles
        </button>
      </footer>
    </article>
  )
}

export default Group;