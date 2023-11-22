import './UpdateGroup.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Group from '../../../components/group/Group';
import Toolbar from '../../../components/toolbar/Toolbar';
import groupsService from '../../../services/groups.service';
import { Button, Input, message } from 'antd';
import GoBack from '../../../components/go-back/GoBack';
import { noConnectionError } from '../../../utils/shared/errorHandler';

function UpdateGroup() {
  const params = useParams();
  const navigate = useNavigate();

  const prevName = params.name;
  const [inputValue, setInputValue] = useState(prevName);
  const [inputNameStatus, setInputNameStatus] = useState('');

  useEffect(() => {
    if (params.name) {
      const input = document.getElementById('name');
      input.value = params.name;
    }
  }, [params.name])


  async function updateGroup(e) {
    e.preventDefault();
    if (!e.target.name.value) {
      message.error('El nombre no puede estar vacío');
      setInputNameStatus('error');
    } else if (prevName !== inputValue) {
      setInputNameStatus('');
      const updatedGroup = {
        id: params.id,
        name: inputValue
      }
      message.loading('Actualizando...', 0)
      groupsService.updateGroup(updatedGroup).then(() => {
        navigate('/groups');
        message.destroy();
        message.success('Actualizado', 2);
      }).catch(err => {
        if (!err.response) {
          noConnectionError();
        }
        message.destroy();
      })
    } else {
      message.error('El curso no puede tener el mismo nombre que el anterior')
      setInputNameStatus('error')
    }
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
      <GoBack link='/admin/groups' alt='volver a los cursos' />
      <main className='update-group-main'>
        <h3>Actualizando curso</h3>
        <h5>Previsualización</h5>
        <Group group={{ name: inputValue }} ident={0} />
        <form onSubmit={(e) => updateGroup(e)}>
          <Input
            id='name'
            name='name'
            type='text'
            placeholder='Nombre del curso'
            status={inputNameStatus}
            onKeyUp={(e) => updateTitle(e)}
          />
          <Button htmlType='submit'>Actualizar</Button>
        </form>
      </main>
      <Toolbar />
    </div>
  );
}

export default UpdateGroup;