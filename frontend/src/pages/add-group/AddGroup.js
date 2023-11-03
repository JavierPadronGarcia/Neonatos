import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './AddGroup.css';

function AddGroup() {

  const navigate = useNavigate();

  const addGroup = (event) => {
    event.preventDefault()
    console.log(event);
  }

  return (
    <div className='add-group-page'>
      <Header />
      <div className='add-group-page-arrow' onClick={() => navigate('/')}>
        <img src='/assets/icons/arrow-left.svg' />
      </div>
      <main className='add-group-main'>
        <h3>Nuevo curso</h3>
        <form onSubmit={(event) => addGroup()}>
          <input type='text' placeholder='Nombre del curso' />
          <button>Agregar</button>
        </form>
      </main>
    </div>
  );
}

export default AddGroup;