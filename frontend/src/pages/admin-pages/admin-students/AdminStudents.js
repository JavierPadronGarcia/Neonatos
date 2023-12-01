import './AdminStudents.css';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import StudentCard from '../../../components/student/StudentCard';
import { useEffect, useState } from 'react';
import groupEnrolementService from '../../../services/groupEnrolement.service';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import { transformArray } from '../../../utils/shared/globalFunctions';
import { LoadingOutlined } from '@ant-design/icons';
import TabsComponent from '../../../components/tabs/TabsComponent';
import TableComponent from '../../../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';

function AdminStudents() {

  const [allStudentsInGroups, setAllStudentsInGroups] = useState([]);
  const [allStudentsNotInAGroup, setAllStudentsNotInAGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const tableColumns = [
    { title: 'Usuario', dataIndex: 'username', key: 'username', align: 'center' },
  ]

  const handleAssign = (student) => {
    const studentStringified = JSON.stringify(student);
    navigate('/admin/students/assign/' + studentStringified);
  }

  return (
    <div className="admin-students-page">
      <Header />
      <div>
        <header className='admin-students-page-header'>
          <h2>Alumnado</h2>
          <TabsComponent pageType='admin' keySelected='4' />
        </header>
        <main>
          <div className='student-mobile-format'>
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
          </div>
          <div className='tables-section'>
            {
              allStudentsInGroups.map((group) => {
                return (
                  <section className="table-container" key={group.id}>
                    <TableComponent
                      tableHeader={tableColumns}
                      tableContent={group.users}
                      showDetails={false}
                      showOptions={false}
                      title={`Curso: ${group.name}`}
                    />
                  </section>
                )
              })
            }
            <section className="table-container">
              <TableComponent
                tableHeader={tableColumns}
                tableContent={allStudentsNotInAGroup}
                showOptions={true}
                showEdit={true}
                notifyUpdate={(student) => handleAssign(student)}
                title={`Sin curso asignado`}
              />
            </section>
          </div>
        </main>
      </div>
      <Toolbar />
    </div>
  );
}

export default AdminStudents;