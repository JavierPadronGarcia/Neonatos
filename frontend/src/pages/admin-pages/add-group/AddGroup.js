import Header from '../../../components/Header/Header';
import './AddGroup.css';
import Group from '../../../components/group/Group';
import { useState } from 'react';
import groupsService from '../../../services/groups.service';
import Toolbar from '../../../components/toolbar/Toolbar';
import { Button, Input, message } from 'antd';
import GoBack from '../../../components/go-back/GoBack';
import { errorMessage, noConnectionError } from '../../../utils/shared/errorHandler';

function AddGroup() {

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
        message.destroy();
        if (!err.response) {
          noConnectionError();
        }

        if (err.response && err.code === 400) {
          errorMessage('El curso debe tener un nombre', 'Intentelo de nuevo');
        }

        if (err.response && err.code === 500) {
          errorMessage('No se pudo crear el curso', 'Intentelo de nuevo');
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
      <Header pageName='Administración' />
      <GoBack link='/admin/groups' alt='back to groups' />
      <main className='add-group-main'>
        <h3>Nuevo curso</h3>
        <div>
          <h5>Previsualización</h5>
          <Group group={{ name: inputValue }} ident={0} />
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
        </div>
      </main>
      <Toolbar />
    </div>
  );
}

export default AddGroup;