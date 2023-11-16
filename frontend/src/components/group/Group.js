import './Group.css';
import { useNavigate } from 'react-router-dom';
import { Popconfirm } from 'antd';
import { useState } from 'react';

function Group(props) {
  const name = props.name;
  const ident = props.ident;
  const edit = props.edit;

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const showPopDelete = () => {
    setOpen(true);
  }

  const cancelDeletion = () => {
    setOpen(false);
  }

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
          <button onclick={() => navigate(`/admin/groups/details/${ident}`)}>
            Ver detalles
          </button>
        </footer>
      </article>
    )
  } else {
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
          <p>{name}</p>
          <img src="/assets/icons/pencil.svg" alt="edit group" onClick={() => navigate(`/admin/groups/update/${name}/${ident}`)} />
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