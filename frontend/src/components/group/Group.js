import './Group.css';
import { useNavigate } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import { useState } from 'react';

function Group(props) {
  const group = props.group;
  const edit = props.edit;
  const assign = props.assign;

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const showPopDelete = () => {
    setOpen(true);
  }

  const cancelDeletion = () => {
    setOpen(false);
  }

  const deleteGroup = () => {
    props.notifyDelete(group.id);
    setOpen(false);
  }

  if (edit) {
    return (
      <article className='group-component'>
        <header className='group-component-header'>
          <Popconfirm
            title="Eliminar este curso?"
            open={open}
            placement='left'
            onConfirm={deleteGroup}
            onCancel={cancelDeletion}
            okText='Confirmar'
            cancelText='Cancelar'
          >
            <img src="/assets/icons/trash-can.svg" alt="delete group" onClick={() => showPopDelete()} />
          </Popconfirm>
          <p>{group.name}</p>
          <img src="/assets/icons/pencil.svg" alt="edit group" onClick={() => navigate(`/admin/groups/update/${group.name}/${group.id}`)} />
        </header>
        <main className='group-component-main'>
          <p>Profesores: {group.TeacherCount}</p>
          <p>Estudiantes: {group.StudentCount}</p>
        </main>
        <footer className='group-component-footer'>
          <Button onclick={() => navigate(`/groups/details/${group.id}`)}>
            Ver detalles
          </Button>
        </footer>
      </article>
    )
  }


  if (assign) {
    return (
      <article className='group-component-assign'>
        <header className='group-component-header-assign'>
          <p>{group.name}</p>
        </header>
        <main className='group-component-main'>
          <p>Cantidad de profesores</p>
          <p>Cantidad de estudiantes</p>
        </main>
        <footer className='group-component-footer-assign'>
          <Button onClick={() => props.notifyAssign()}>Asignar a esta clase</Button>
        </footer>
      </article>
    )
  }

  return (
    <article className='group-component-no-edit'>
      <header className='group-component-header-no-edit'>
        <p>{group.name}</p>
      </header>
      <main className='group-component-main'>
        {group.TeacherCount
          ? <p>Profesores: {group.TeacherCount}</p>
          : <p>Cantidad de profesores</p>
        }
        {group.StudentCount
          ? <p>Estudiantes: {group.StudentCount}</p>
          : <p>Cantidad de estudiantes</p>
        }
      </main>
      <footer className='group-component-footer-no-edit'>
        <Button onclick={() => navigate(`/admin/groups/details/${group.id}`)}>
          Ver detalles
        </Button>
      </footer>
    </article>
  )
}




export default Group;