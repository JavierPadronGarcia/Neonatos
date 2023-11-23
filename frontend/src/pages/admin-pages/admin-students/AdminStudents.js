import './AdminStudents.css';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import StudentCard from '../../../components/student/StudentCard';
import { useEffect, useState } from 'react';
import groupEnrolementService from '../../../services/groupEnrolement.service';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import { transformArray } from '../../../utils/shared/globalFunctions';
import { LoadingOutlined } from '@ant-design/icons';

function AdminStudents() {

  const [allStudentsInGroups, setAllStudentsInGroups] = useState([]);
  const [allStudentsNotInAGroup, setAllStudentsNotInAGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllData = async () => {
    try {
      setLoading(true);
      const studentsInGroups = await groupEnrolementService.getAllOrderedByGroupDesc();
      const studentsNotInAGroup = await groupEnrolementService.getAllStudentsNotInAGroup();
      setAllStudentsInGroups(transformArray(studentsInGroups));
      setAllStudentsNotInAGroup(studentsNotInAGroup);
      setLoading(false);
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="admin-students-page">
      <Header />
      <div>
        <header className='admin-students-page-header'>
          <h2>Alumnado</h2>
        </header>
        <main>
          {loading &&
            <LoadingOutlined style={{ fontSize: 60, color: '#08c', display: 'flex', justifyContent: 'center' }} />
          }
          {allStudentsInGroups.length === 0 && !loading &&
            <p style={{ display: 'flex', justifyContent: 'center' }}>No hay estudiantes en ningún curso</p>
          }
          {allStudentsInGroups.map((group, index) => {
            return (
              <section className='group-section' key={index}>
                <h3>{group.name}</h3>
                <ul>
                  {group.users.map((student, index) => {
                    return (
                      <li key={index}><StudentCard student={student} /></li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
          {allStudentsNotInAGroup.length !== 0 &&
            <section className='group-section'>
              <h3>Estudiantes sin clase</h3>
              <ul>
                {allStudentsNotInAGroup.map((student, index) => {
                  return (
                    <li key={index}><StudentCard student={student} assignStudent={true} /></li>
                  );
                })}
              </ul>
            </section>
          }
          {
            allStudentsNotInAGroup.length === 0 && !loading &&
            <p style={{ display: 'flex', justifyContent: 'center' }}>No hay estudiantes sin clase</p>
          }

        </main>
      </div>
      <Toolbar />
    </div>
  );
}

export default AdminStudents;