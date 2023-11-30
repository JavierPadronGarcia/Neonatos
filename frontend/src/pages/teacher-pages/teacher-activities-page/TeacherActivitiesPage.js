import './TeacherActivitiesPage.css';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import GoBack from '../../../components/go-back/GoBack';
import Add from '../../../components/add/Add';
import ActivityCard from '../../../components/activity-card/ActivityCard';
import { useEffect } from 'react';
import exercisesService from '../../../services/exercises.service';
function TeacherActivitiesPage() {

  const { name, id, workUnitId, workUnitName } = useParams();
  const colors = JSON.parse(sessionStorage.getItem('colors'));

  const activity = {
    title: "titulo-prueba",
    description: "descripcion-prueba",
  }

  const getAllExercises = () => {

  }

  useEffect(() => {

  }, [])


  const handleDelete = (activityId) => {
    console.log(activityId)
  }

  return (
    <div className='teacher-activities-page'>
      <Header />
      <div className='teacher-activities-page-main'>
        <div style={{ background: colors.primaryColor }} className='activity-section'>
          <header>
            <GoBack link={`/teacher/main/group/${name}/${id}`} alt='volver a todas las unidades' />
            <span className='workUnitName' style={{ color: colors.text }}>{workUnitName}</span>
            <Add
              link={`./addActivity`}
              colors={{ background: colors.secondaryColor, text: colors.text }}
            />
          </header>
          <main>

            <section className='evaluable-activities'>
              <header style={{ color: colors.text }}>
                <span>Actividades evaluadas</span>
              </header>
              <main>

                <ActivityCard
                  edit={true}
                  id={1}
                  title={activity.title}
                  description={activity.description}
                  notifyDelete={(activityId) => handleDelete(activityId)}
                />

                <ActivityCard
                  edit={true}
                  id={2}
                  title={activity.title}
                  description={activity.description}
                  notifyDelete={(activityId) => handleDelete(activityId)}
                />

                <ActivityCard
                  edit={true}
                  id={3}
                  title={activity.title}
                  description={activity.description}
                  notifyDelete={(activityId) => handleDelete(activityId)}
                />
              </main>
            </section>

            <section className='non-evaluable-activities'>
              <header style={{ color: colors.text }}>
                <span>Actividades no evaluadas</span>
              </header>
              <main>
                <ActivityCard edit={true} title={activity.title} />
                <ActivityCard edit={true} title={activity.title} />
                <ActivityCard edit={true} title={activity.title} />
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