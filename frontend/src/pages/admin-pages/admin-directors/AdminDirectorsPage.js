import './AdminDirectorsPage.css';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import usersService from '../../../services/users.service';
import DirectorCard from '../../../components/director/DirectorCard';
import errorHandler from '../../../utils/errorHandler';

function AdminDirectorsPage() {

  const [allDirectors, setDirectors] = useState([]);
  const [assignedDirector, setAssignedDirector] = useState({});

  const getAllDirectors = async () => {
    try {
      const directors = await usersService.getAllDirectors();
      const directorAssigned = await directors.find((director) => director.isDirector === true) || {};
      return { allDirectors: directors, assignedDirector: directorAssigned }
    } catch (err) {
      if (!err.response) {
        errorHandler.noConnectionError();
      }
    }
  }

  const setElements = (data) => {
    const allDirectors = data.allDirectors;
    const assignedDirectorIndex = allDirectors.findIndex(director => director.id === data.assignedDirector.id)
    const assignedDirector = allDirectors.splice(assignedDirectorIndex, 1);
    setAssignedDirector(assignedDirector[0]);
    setDirectors(allDirectors);
  }

  const handleAssign = (newDirectorId) => {
    const assignedDirectorId = assignedDirector.id;
    message.open({
      type: 'loading',
      content: 'Asignando...',
    });
    usersService.assignDirector(assignedDirectorId, newDirectorId).then(response => {
      message.destroy();
      setUpDirectors();
      message.open({
        type: 'success',
        content: 'Asignado correctamente',
        duration: 2
      });
    }).catch(err => {
      if (!err.response) {
        errorHandler.noConnectionError();
      }
    })
  }

  const setUpDirectors = () => {
    getAllDirectors().then(data => {
      setElements(data);
    });
  }

  useEffect(() => {
    setUpDirectors();
  }, [])

  const showAllDirectors = () => {
    return allDirectors.map((director) => {
      return (
        <DirectorCard
          director={director}
          key={director.id}
          notifyAssign={(newDirectorId) => handleAssign(newDirectorId)}
        />
      );
    })
  }

  return (
    <div className="admin-directors-page">
      <Header />
      <div className="admin-directors-page-main">
        <header className='admin-directors-page-header'>
          <h2>Directores</h2>
        </header>
        <small>Solo puede haber un director asignado a la misma vez</small>
        <main>
          {assignedDirector.id &&
            <DirectorCard director={assignedDirector} />
            || <p>No hay director asignado</p>
          }
          <div>
            <span>Directores sin asignar:</span>
            {allDirectors.length != 0 &&
              showAllDirectors()}
          </div>
        </main>
      </div>
      <Toolbar />
    </div>
  );
}

export default AdminDirectorsPage;