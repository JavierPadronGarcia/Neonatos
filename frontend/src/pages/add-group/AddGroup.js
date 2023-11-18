import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './AddGroup.css';
import Group from '../../components/group/Group';
import { useState } from 'react';
import groupsService from '../../services/groups.service';
import Toolbar from '../../components/toolbar/Toolbar';
import { Button, Input, message, notification } from 'antd';
import GoBack from '../../components/go-back/GoBack';

function AddGroup() {

  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("Nombre del curso");
  const [inputNameStatus, setInputNameStatus] = useState('');

  async function addGroup(e) {
    e.preventDefault();
    const inputName = e.target.name;
    if (inputName.value) {
      setInputNameStatus('');
      message.loading('Insertando...', 0);
      groupsService.addGroup(inputValue).then(() => {
        message.destroy();
        message.success('Nuevo curso insertado', 1);
        setInputValue("");
        document.getElementById('name').value = '';
        updateTitle();
      }).catch(err => {
        if (!err.response) {
          message.destroy();
          notification.error({
            message: 'Error de conexión',
            description: "No se ha podido establecer una conexión con el servidor, intentalo de nuevo o pruebalo más tarde",
            placement: 'top',
          });
        }
      });
    } else {
      message.info('Debe escribir un nombre', 3);
      setInputNameStatus('error');
    }
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
      <GoBack link='/admin/groups' alt='back to groups' />
      <main className='add-group-main'>
        <h3>Nuevo curso</h3>
        <h5>Previsualización</h5>
        <Group name={inputValue} ident={0} />
        <form onSubmit={(e) => addGroup(e)}>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Nombre del curso'
            status={inputNameStatus}
            onKeyUp={(e) => updateTitle(e)}
          />
          <Button htmlType='submit'>Agregar</Button>
        </form>
      </main>
      <Toolbar />
    </div>
  );
}

export default AddGroup;