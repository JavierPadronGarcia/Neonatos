import './AddActivityPage.css';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import ActivityForm from '../../../components/activity-form/ActivityForm';
import { useParams } from 'react-router-dom';
import GoBack from '../../../components/go-back/GoBack';

function AddActivityPage() {

  const { id, name, workUnitId, workUnitName } = useParams();

  return (
    <div className='add-activity-page'>
      <Header pageName='Agregando actividad' />
      <GoBack link={`../main/group/${name}/${id}/unit/${workUnitId}/${workUnitName}`} alt='volver a la unidad' />
      <div className='add-activity-page-form'>
        <ActivityForm groupId={id} workUnitId={workUnitId} />
      </div>
      <Toolbar />
    </div>
  )
}
export default AddActivityPage;