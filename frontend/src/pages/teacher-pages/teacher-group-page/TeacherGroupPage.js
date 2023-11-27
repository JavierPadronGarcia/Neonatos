import './TeacherGroupPage.css';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import WorkUnitComponent from '../../../components/work-unit/WorkUnitComponent';
import workUnitService from '../../../services/workUnitsColors.service';

function TeacherGroupPage() {

  const { name, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [allWorkUnits, setAllWorkUnits] = useState([]);

  const getAllWorkUnits = async () => {
    const workUnits = await workUnitService.getAllWorkUnitsWithColors();
    setAllWorkUnits(workUnits);
    setLoading(false)
  }

  useEffect(() => {
    getAllWorkUnits();
  }, []);

  const showWorkUnits = () => (
    allWorkUnits.map((workUnit) => (
      <WorkUnitComponent workUnit={workUnit} key={workUnit.id} />
    ))
  )

  return (
    <div className='teacher-group-page'>
      <Header />
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