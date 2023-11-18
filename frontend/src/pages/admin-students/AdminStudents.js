import './AdminStudents.css';
import Header from '../../components/Header/Header';
import Toolbar from '../../components/toolbar/Toolbar';
import StudentCard from '../../components/student/StudentCard';
import { useEffect, useState } from 'react';
import groupEnrolementService from '../../services/groupEnrolement.service';

function AdminStudents() {

  const [allStudentsInGroups, setAllStudentsInGroups] = useState([]);
  const [allStudentsNotInAGroup, setAllStudentsNotInAGroup] = useState([]);

  const getAllData = async () => {
    const studentsInGroups = await groupEnrolementService.getAllOrderedByGroupDesc();
    const studentsNotInAGroup = await groupEnrolementService.getAllStudentsNotInAGroup();
    setAllStudentsInGroups(transformArray(studentsInGroups));
    setAllStudentsNotInAGroup(studentsNotInAGroup);
  }

  const transformArray = (allData) => {
    let newArray = [];
    allData.forEach(groupEnrolement => {
      let foundGroup = false;
      for (var i = 0; i < newArray.length; i++) {
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
            "id": groupEnrolement.User.id,
            "username": groupEnrolement.User.username
          }]
        })
      } else {
        for (var j = 0; j < newArray.length; j++) {
          if (newArray[j].id == groupEnrolement.group.id) {
            newArray[j].users.push({ "id": groupEnrolement.User.id, "username": groupEnrolement.User.username })
          }
        }
      }
    });
    return newArray;
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
                  {group.users.map((user, index) => {
                    return (
                      <li key={index}><StudentCard studentName={user.username} /></li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
          <section className='group-section'>
            <h3>Estudiantes sin clase</h3>
            <ul>
              {allStudentsNotInAGroup.map((student, index) => {
                return (
                  <li key={index}><StudentCard studentName={student.username} assignStudent={true} /></li>
                );
              })}
            </ul>
          </section>
        </main>
      </div>
      <Toolbar />
    </div>
  );
}

export default AdminStudents;