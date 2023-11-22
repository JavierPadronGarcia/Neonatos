import './AdminStudents.css';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import StudentCard from '../../../components/student/StudentCard';
import { useEffect, useState } from 'react';
import groupEnrolementService from '../../../services/groupEnrolement.service';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import { transformArray } from '../../../utils/shared/globalFunctions';

function AdminStudents() {

  const [allStudentsInGroups, setAllStudentsInGroups] = useState([]);
  const [allStudentsNotInAGroup, setAllStudentsNotInAGroup] = useState([]);

  const getAllData = async () => {
    try {
      const studentsInGroups = await groupEnrolementService.getAllOrderedByGroupDesc();
      const studentsNotInAGroup = await groupEnrolementService.getAllStudentsNotInAGroup();
      setAllStudentsInGroups(transformArray(studentsInGroups));
      setAllStudentsNotInAGroup(studentsNotInAGroup);
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
        </main>
      </div>
      <Toolbar />
    </div>
  );
}

export default AdminStudents;