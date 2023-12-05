import { Card, Input, Popconfirm, Popover } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ActivityForm from '../activity-form/ActivityForm';
import { useParams } from 'react-router-dom';

const { Meta } = Card;

function ActivityCard({ edit, id, title, description, assigned, notifyDelete }) {
  const [isOpen, setOpen] = useState(false);
  const params = useParams();
  const groupId = params.id;
  const workUnitId = params.workUnitId;

  const handleOpenDetails = () => {

  }

  const formatDate = (date) => {
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate();

    var formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

    return formattedDate;
  }


  if (edit) {

    const handleDelete = () => {
      notifyDelete(id, description);
      setOpen(false);
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

    const formUpdateContent = () => (
      <div>
        <ActivityForm
          groupId={groupId}
          workUnitId={workUnitId}
          isUpdateForm={true}
          updateFormContent={{ case: { id: id, name: title }, date: description, assigned: assigned }} />
      </div>
    )

    const editElement = () => (
      <Popover content={formUpdateContent}
        trigger='click'
      >
        <EditOutlined key='edit' />
      </Popover>
    )

    return (
      <Card
        style={{ width: '80%' }}
        className='activities-card'
        actions={[
          (deleteElement()),
          (editElement()),
          <EllipsisOutlined key='ellipsis' onClick={() => handleOpenDetails()} />
        ]}
      >
        <Meta title={title} description={description ? formatDate(description) : ''} />
      </Card>
    );
  }

  return (
    <Card
      style={{ width: '100%' }}
      className='activities-card'
      actions={[
        <EllipsisOutlined key='ellipsis' onClick={() => handleOpenDetails()} />
      ]}
    >
      <Meta title={title} description={description ? formatDate(description) : ''} />
    </Card>
  );
}

export default ActivityCard;