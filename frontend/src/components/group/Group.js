import './Group.css';
import { useNavigate } from 'react-router-dom';

function Group(props) {

  const navigate = useNavigate();

  const name = props.name;
  const ident = props.ident;
  const edit = props.edit;

  const deleteGroup = () => {
    props.notifyDelete(props.ident);
  }

  if (!edit) {
    return (
      <article className='group-component-no-edit'>
        <header className='group-component-header-no-edit'>
          <p>{name}</p>
        </header>
        <main className='group-component-main'>
          <p>cantidad de profesores</p>
          <p>cantidad de estudiantes</p>
        </main>
        <footer className='group-component-footer-no-edit'>
          <button onclick={() => navigate(`/groups/details/${ident}`)}>
            Ver detalles
          </button>
        </footer>
      </article>
    )
  } else {
    return (
      <article className='group-component'>
        <header className='group-component-header'>
          <img src="/assets/icons/trash-can.svg" alt="delete group" onClick={() => deleteGroup()} />
          <p>{name}</p>
          <img src="/assets/icons/pencil.svg" alt="edit group" onClick={() => navigate(`/groups/update/${name}/${ident}`)} />
        </header>
        <main className='group-component-main'>
          <p>cantidad de profesores</p>
          <p>cantidad de estudiantes</p>
        </main>
        <footer className='group-component-footer'>
          <button onclick={() => navigate(`/groups/details/${ident}`)}>
            Ver detalles
          </button>
        </footer>
      </article>
    )
  }


}

export default Group;