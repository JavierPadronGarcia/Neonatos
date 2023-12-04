import './TeacherActivitiesPage.css';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import GoBack from '../../../components/go-back/GoBack';
import Add from '../../../components/add/Add';
import ActivityCard from '../../../components/activity-card/ActivityCard';
import { useEffect, useState } from 'react';
import exercisesService from '../../../services/exercises.service';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import { message } from 'antd';
function TeacherActivitiesPage() {

  const { name, id, workUnitId, workUnitName } = useParams();
  const colors = JSON.parse(sessionStorage.getItem('colors'));

  const [assignedExercises, setAssignedExercises] = useState([]);
  const [unAssignedExercises, setUnAssignedExercises] = useState([]);

  const getAllExercises = () => {
    exercisesService.getAllExercisesOfTheGroup(id, workUnitId).then(exercises => {
      setAssignedExercises(exercises.filter(exercise => exercise.assigned == true));
      setUnAssignedExercises(exercises.filter(exercise => exercise.assigned == false));
    });
  }

  useEffect(() => {
    getAllExercises();
  }, [])

  const handleDelete = (activityId, assigned) => {
    exercisesService.deleteExercise(id, workUnitId, activityId, assigned).then(response => {
      message.success('Actividad eliminada correctamente', 2);
      getAllExercises();
    }).catch(err => {
      if (!err.response) {
        noConnectionError();
      }
    })
  }

  const showAssignedExercises = () => (
    assignedExercises.map(exercise => {
      return (
        <ActivityCard
          key={exercise.id}
          edit={true}
          id={exercise.id}
          title={exercise.name}
          description={'hola'}
          notifyDelete={(activityId) => handleDelete(activityId, true)}
        />
      )
    })
  )

  const showUnAssignedExercises = () => (
    unAssignedExercises.map(exercise => {
      return (
        <ActivityCard
          key={exercise.id}
          edit={true}
          id={exercise.id}
          title={exercise.name}
          notifyDelete={(activityId) => handleDelete(activityId, false)}
        />
      )
    })
  )

  return (
    <div className='teacher-activities-page'>
      <Header pageName={name} />
      <div className='teacher-activities-page-main'>
        <div style={{ background: colors.primaryColor }} className='activity-section'>
          <header>
            <GoBack link={`/teacher/main/group/${name}/${id}`} alt='volver a todas las unidades' />
            <span className='workUnitName' style={{ color: colors.text }}>{workUnitName}</span>
            <Add
              link={`./add`}
              colors={{ background: colors.secondaryColor, text: colors.text }}
            />
          </header>
          <main>

            <section className='evaluable-activities'>
              <header style={{ color: colors.text }}>
                <span>Actividades evaluadas</span>
              </header>
              <main>
                {showAssignedExercises()}
              </main>
            </section>

            <section className='non-evaluable-activities'>
              <header style={{ color: colors.text }}>
                <span>Actividades no evaluadas</span>
              </header>
              <main>
                {showUnAssignedExercises()}
              </main>
            </section>

          </main>
        </div>
      </div>
      <Toolbar />
    </div>
  );
}

export default TeacherActivitiesPage;