import { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import teacherGroupService from '../../../services/teacherGroup.service';
import './AdminTeachers.css';
import TeacherCard from '../../../components/teacher/TeacherCard';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import {transformArray} from '../../../utils/shared/globalFunctions';

function AdminTeachers() {

  const [teachersByGroup, setTeachersByGroup] = useState([]);
  const [allTeachersNotInAGroup, setAllTeachersNotInAGroup] = useState([]);

  const getAllTeachers = async () => {
    try {
      const teachersInGroups = await teacherGroupService.getAllOrderedByGroupDesc();
      const teachersWithoutGroup = await teacherGroupService.getAllTeachersNotInAGroup();
      setTeachersByGroup(transformArray(teachersInGroups));
      setAllTeachersNotInAGroup(teachersWithoutGroup);
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  useEffect(() => {
    getAllTeachers();
  }, [])

  return (
    <div className="admin-teachers-page">
      <Header />
      <div className='admin-teachers-page-main'>
        <header className='admin-teachers-page-header'>
          <h2>Profesorado</h2>
        </header>
        <main>
          {teachersByGroup.map((group, index) => {
            return (
              <section className='group-section' key={index}>
                <h3>{group.name}</h3>
                <ul>
                  {group.users.map((teacher, index) => {
                    return (
                      <li key={index}><TeacherCard teacher={teacher} /></li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
          {allTeachersNotInAGroup.length !== 0 &&
            <section className='group-section'>
              <h3>Profesores sin clase</h3>
              <ul>
                {allTeachersNotInAGroup.map((teacher, index) => {
                  return (
                    <li key={index}><TeacherCard teacher={teacher} assignTeacher={true} /></li>
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

export default AdminTeachers;