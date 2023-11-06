import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './AddGroup.css';
import Group from '../../components/group/Group';
import { useState } from 'react';
import groupsService from '../../services/groups.service';
import Toolbar from '../../components/toolbar/Toolbar';
import { message } from 'antd';

function AddGroup() {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("Nombre del curso");

  async function addGroup(e) {
    e.preventDefault();
    message.loading('Insertando...', 0);
    groupsService.addGroup(inputValue).then(() => {
      message.destroy();
      message.success('Nuevo curso insertado', 1);
      setInputValue("");
      document.getElementById('name').value = '';
      updateTitle();
    });
  }

  const updateTitle = (e) => {
    if (!e || e.target.value === "") {
      setInputValue("Nombre del curso")
    } else {
      setInputValue(e.target.value)
    }
  }

  return (
    <div className='add-group-page'>
      <Header />
      <div className='add-group-page-arrow' onClick={() => navigate('/groups')}>
        <img src='/assets/icons/arrow-left.svg' />
      </div>
      <main className='add-group-main'>
        <h3>Nuevo curso</h3>
        <h5>Previsualización</h5>
        <Group name={inputValue} ident={0} />
        <form onSubmit={(e) => addGroup(e)}>
          <input id='name' name='name' type='text' placeholder='Nombre del curso' onKeyUp={(e) => updateTitle(e)} />
          <button>Agregar</button>
        </form>
      </main>
      <Toolbar />
    </div>
  );
}

export default AddGroup;