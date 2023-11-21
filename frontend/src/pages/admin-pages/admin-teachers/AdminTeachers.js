import { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import teacherGroupService from '../../../services/teacherGroup.service';
import './AdminTeachers.css';
import TeacherCard from '../../../components/teacher/TeacherCard';
import errorHandler from '../../../utils/errorHandler';

function AdminTeachers() {

  const [teachersByGroup, setTeachersByGroup] = useState([]);
  const [allTeachersNotInAGroup, setAllTeachersNotInAGroup] = useState([]);

  //this function transform the array to propperly
  //show information like: {group1, users:[user1, user2]}
  const transformArray = (allData) => {
    let newArray = [];
    allData.forEach(groupEnrolement => {
      let foundGroup = false;
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id == groupEnrolement.group.id) {
          foundGroup = true;
          break;
        }
      }
      if (!foundGroup) {
        newArray.push({
          id: groupEnrolement.group.id,
          name: groupEnrolement.group.name,
          users: [{
            id: groupEnrolement.User.id,
            username: groupEnrolement.User.username
          }]
        })
      } else {
        for (let j = 0; j < newArray.length; j++) {
          if (newArray[j].id == groupEnrolement.group.id) {
            newArray[j].users.push({ id: groupEnrolement.User.id, username: groupEnrolement.User.username })
          }
        }
      }
    });
    return newArray;
  }

  const getAllTeachers = async () => {
    try {
      const teachersInGroups = await teacherGroupService.getAllOrderedByGroupDesc();
      const teachersWithoutGroup = await teacherGroupService.getAllTeachersNotInAGroup();
      setTeachersByGroup(transformArray(teachersInGroups));
      setAllTeachersNotInAGroup(teachersWithoutGroup);
    } catch (err) {
      if (!err.response) {
        errorHandler.noConnectionError();
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