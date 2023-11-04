import './UpdateGroup.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Group from '../../components/group/Group';
import Toolbar from '../../components/toolbar/Toolbar';
import groupsService from '../../services/groups.service';

function UpdateGroup() {
  const params = useParams();
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState(params.name);

  useEffect(() => {
    if (params.name) {
      const input = document.getElementById('name');
      input.value = params.name;
    }
  }, [params.name])


  async function updateGroup(e) {
    e.preventDefault();
    const updatedGroup = {
      id: params.id,
      name: inputValue
    }

    groupsService.updateGroup(updatedGroup).then(() => {
      navigate('/groups')
    })
  }

  const updateTitle = (e) => {
    if (e.target.value === "") {
      setInputValue("Nombre del curso")
    } else {
      setInputValue(e.target.value)
    }
  }

  return (
    <div className='update-group-page'>
      <Header />
      <div className='update-group-page-arrow' onClick={() => navigate('/groups')}>
        <img src='/assets/icons/arrow-left.svg' />
      </div>
      <main className='update-group-main'>
        <h3>Actualizando curso</h3>
        <h5>Previsualización</h5>
        <Group name={inputValue} ident={0} />
        <form onSubmit={(e) => updateGroup(e)}>
          <input id='name' name='name' type='text' placeholder='Nombre del curso' onKeyUp={(e) => updateTitle(e)} />
          <button>Actualizar</button>
        </form>
      </main>
      <Toolbar />
    </div>
  );

}

export default UpdateGroup;