import { Button, Card, Modal, Popconfirm, Popover } from 'antd';
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ActivityForm from '../activity-form/ActivityForm';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ReportGenerator from '../report-generator/ReportGenerator';

const { Meta } = Card;

function ActivityCard({ edit, id, title, description, assigned, notifyDelete, notifyUpdateInfo }) {
  const [isOpen, setOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const groupId = params.id;
  const workUnitId = params.workUnitId;
  const [reportOpen, setReportOpen] = useState(false);
  const [popOverOpen, setpopOverOpen] = useState(false);

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
          updateFormContent={{ case: { id: id, name: title }, date: description, assigned: assigned }}
          notifyUpdateInfo={() => notifyUpdateInfo()} />
      </div>
    )

    const editElement = () => (
      <Popover content={formUpdateContent}
        trigger='click'
      >
        <EditOutlined key='edit' />
      </Popover>
    )

    const prepareActivityReport = () => {
      const reportData = {
        groupId: groupId,
        caseId: id,
        workUnitId: workUnitId,
        assigned: assigned,
        finishDate: dayjs(description).format('YYYY-MM-DD')
      }
      return reportData;
    }

    const detailsList = () => (
      <ul>
        <li><Button onClick={() => setReportOpen(true)}>Ver reporte de notas</Button></li>
      </ul>
    )

    const detailsElement = () => (
      <Popover content={detailsList}
        trigger='click'
        style={{ zIndex: 100 }}
      >
        <EllipsisOutlined key='ellipsis' />
      </Popover>
    )

    return (
      <>
        <Modal centered
          open={reportOpen}
          onOk={() => setReportOpen(false)}
          onCancel={() => setReportOpen(false)}
          style={{ zIndex: '5000 !important' }}
          width='90%'
        >
          <ReportGenerator reportData={prepareActivityReport()} />
        </Modal>
        <Card
          style={{ width: '80%' }}
          className='activities-card'
          actions={[
            (deleteElement()),
            (editElement()),
            (detailsElement())
          ]}
        >
          <Meta title={title} description={description ? formatDate(description) : ''} />
        </Card>
      </>
    );
  }

  return (
    <Card
      style={{ width: '100%' }}
      className='activities-card'
      actions={[
        <EllipsisOutlined key='ellipsis' />
      ]}
    >
      <Meta title={title} description={description ? formatDate(description) : ''} />
    </Card>
  );
}

export default ActivityCard;