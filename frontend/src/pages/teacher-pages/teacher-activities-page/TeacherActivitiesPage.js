import './TeacherActivitiesPage.css';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import GoBack from '../../../components/go-back/GoBack';
import Add from '../../../components/add/Add';

function TeacherActivitiesPage() {

  const { name, id, workUnitId, workUnitName } = useParams();
  const colors = JSON.parse(localStorage.getItem('colors'));

  return (
    <div className='teacher-activities-page'>
      <Header />
      <div className='teacher-activities-page-main'>
        <div style={{ background: colors.primaryColor }} className='activity-section'>
          <GoBack link={`/teacher/main/group/${name}/${id}`} alt='volver a todas las unidades' />
          <span className='workUnitName'>{workUnitName}</span>
          <Add colors={{ background: colors.secondaryColor, text: colors.text }} />
        </div>
      </div>
      <Toolbar />
    </div>
  );


}

export default TeacherActivitiesPage;