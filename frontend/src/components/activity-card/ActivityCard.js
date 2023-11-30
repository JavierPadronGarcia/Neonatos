import { Card, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Meta } = Card;

function ActivityCard({ edit, id, title, description, notifyDelete }) {
  const [isOpen, setOpen] = useState(false);

  const handleOpenDetails = () => {

  }

  if (edit) {

    const handleDelete = () => {
      notifyDelete(id);
      setOpen(false);
    }

    const handleUpdate = () => {

    }

    const deleteElement = () => (
      <Popconfirm
        title='¿Eliminar esta actividad?'
        open={isOpen}
        onConfirm={() => handleDelete()}
        onCancel={() => setOpen(false)}
        okText='Confirmar'
        cancelText='Cancelar'
      >
        <DeleteOutlined key='delete' onClick={() => setOpen(true)} />
      </Popconfirm>
    )

    return (
      <Card
        style={{ width: '80%' }}
        className='activities-card'
        actions={[
          (deleteElement()),
          <EditOutlined key='edit' onClick={() => handleUpdate()} />,
          <EllipsisOutlined key='ellipsis' onClick={() => handleOpenDetails()} />
        ]}
      >
        <Meta title={title} description={description} />
      </Card>
    );
  }

  return (
    <Card
      style={{ width: '80%' }}
      className='activities-card'
      actions={[
        <EllipsisOutlined key='ellipsis' onClick={() => handleOpenDetails()} />
      ]}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}

export default ActivityCard;