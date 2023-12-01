import './AdminDirectorsPage.css';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import usersService from '../../../services/users.service';
import DirectorCard from '../../../components/director/DirectorCard';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import { LoadingOutlined } from '@ant-design/icons';
import TabsComponent from '../../../components/tabs/TabsComponent';
import TableComponent from '../../../components/table/TableComponent';

function AdminDirectorsPage() {

  const [allDirectors, setDirectors] = useState([]);
  const [assignedDirector, setAssignedDirector] = useState({});
  const [loading, setLoading] = useState(true);

  const getAllDirectors = async () => {
    try {
      setLoading(true);
      const directors = await usersService.getAllDirectors();
      const directorAssigned = await directors.find((director) => director.isDirector === true) || {};
      setLoading(false);
      return { allDirectors: directors, assignedDirector: directorAssigned }
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
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
        noConnectionError();
      }
    })
  }

  const setElements = (data) => {
    const allDirectors = data.allDirectors;
    if (allDirectors.length !== 0) {
      const assignedDirectorIndex = allDirectors.findIndex(director => director.id === data.assignedDirector.id)
      if (assignedDirectorIndex !== -1) {
        const assignedDirector = allDirectors.splice(assignedDirectorIndex, 1);
        setAssignedDirector(assignedDirector[0]);
      }
      setDirectors(allDirectors);
    }

  }

  const setUpDirectors = () => {
    getAllDirectors().then(data => {
      setElements(data);
    });
  }

  useEffect(() => {
    setUpDirectors();
  }, [])

  const tableColumns = [
    { title: 'Usuario', dataIndex: 'username', key: 'username', align: 'center' },
  ]

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
          <h2>Dirección</h2>
          <TabsComponent pageType='admin' keySelected='5' />
        </header>
        <small>Solo puede haber un director asignado a la misma vez</small>
        <main>
          <div className='directors-mobile-format'>
            {loading &&
              <LoadingOutlined style={{ fontSize: 60, color: '#08c', display: 'flex', justifyContent: 'center' }} />
            }
            {(assignedDirector.id &&
              <DirectorCard director={assignedDirector} />)
              || <p>No hay director asignado</p>
            }
            <div>
              <span>Directores sin asignar:</span>
              {allDirectors.length === 0 && !loading &&
                <p style={{ display: 'flex', justifyContent: 'center' }}>No se encuentran directores</p>
              }
              {allDirectors.length !== 0
                && showAllDirectors()
              }
            </div>
          </div>
          <div className='tables-section'>
            {(assignedDirector.id &&
              <DirectorCard director={assignedDirector} className='assigned-director' />)
              || <p>No hay director asignado</p>
            }
            <section className="table-container">
              <TableComponent
                tableHeader={tableColumns}
                tableContent={allDirectors}
                textButton='Asignar director'
                showOptions={true}
                title='Directores disponibles'
              />
            </section>
          </div>
        </main>
      </div>
      <Toolbar />
    </div>
  );
}

export default AdminDirectorsPage;