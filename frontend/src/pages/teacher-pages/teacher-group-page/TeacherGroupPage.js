import './TeacherGroupPage.css';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import WorkUnitComponent from '../../../components/work-unit/WorkUnitComponent';
import workUnitGroupService from '../../../services/workUnitGroups.service';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import GoBack from '../../../components/go-back/GoBack';

function TeacherGroupPage() {

  const { name, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [allWorkUnits, setAllWorkUnits] = useState([]);

  const getAllWorkUnits = async () => {
    try {
      const workUnits = await workUnitGroupService.getAllWorkUnitsWithColorsByGroup(id);
      setAllWorkUnits(workUnits);
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
    setLoading(false)
  }

  useEffect(() => {
    getAllWorkUnits();
  }, []);

  const handleUpdateVisibility = async (workUnitId, visibility) => {
    try {
      await workUnitGroupService.updateWorkUnitVisibility(id, workUnitId, visibility);
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  const showWorkUnits = () => (
    allWorkUnits.map((workUnitGroup) => (
      <WorkUnitComponent
        workUnit={workUnitGroup.workUnit}
        unitVisibility={workUnitGroup.visibility}
        key={workUnitGroup.workUnit.id}
        notifyUpdateVisibility={(workUnitId, visibility) => handleUpdateVisibility(workUnitId, visibility)}
      />
    ))
  )

  return (
    <div className='teacher-group-page'>
      <Header pageName={name} />
      <GoBack link='../main' alt='volver al inicio' />
      <h2>{name}</h2>
      <div className='teacher-group-page-main'>
        {loading &&
          <LoadingOutlined style={{ fontSize: 60, color: '#08c', display: 'flex', justifyContent: 'center' }} />
        }
        {showWorkUnits()}
      </div>
      <Toolbar />
    </div>
  );
}

export default TeacherGroupPage;