import './AdminTeachers.css';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import teacherGroupService from '../../../services/teacherGroup.service';
import TeacherCard from '../../../components/teacher/TeacherCard';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import { transformArray } from '../../../utils/shared/globalFunctions';
import { LoadingOutlined } from '@ant-design/icons';
import TabsComponent from '../../../components/tabs/TabsComponent';
import TableComponent from '../../../components/table/TableComponent';
import { useNavigate } from 'react-router-dom';

function AdminTeachers() {

  const [teachersByGroup, setTeachersByGroup] = useState([]);
  const [allTeachersNotInAGroup, setAllTeachersNotInAGroup] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getAllTeachers = async () => {
    try {
      setLoading(true);
      const teachersInGroups = await teacherGroupService.getAllOrderedByGroupDesc();
      const teachersWithoutGroup = await teacherGroupService.getAllTeachersNotInAGroup();
      setTeachersByGroup(transformArray(teachersInGroups));
      setAllTeachersNotInAGroup(teachersWithoutGroup);
      setLoading(false);
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  useEffect(() => {
    getAllTeachers();
  }, [])

  const tableColumns = [
    { title: 'Usuario', dataIndex: 'username', key: 'username', align: 'center' },
  ]

  const handleAssign = (teacher) => {
    const teacherStringified = JSON.stringify(teacher);
    navigate('/admin/teachers/assign/' + teacherStringified);
  }

  return (
    <div className="admin-teachers-page">
      <Header pageName='Administración' />
      <div className='admin-teachers-page-main'>
        <header className='admin-teachers-page-header'>
          <h2>Profesorado</h2>
          <TabsComponent pageType='admin' keySelected='3' />
        </header>
        <main>
          <div className='teacher-mobile-format'>
            {loading &&
              <LoadingOutlined style={{ fontSize: 60, color: '#08c', display: 'flex', justifyContent: 'center' }} />
            }
            {teachersByGroup.length === 0 && !loading &&
              <p style={{ display: 'flex', justifyContent: 'center' }}>No hay profesores en ninguna clase</p>
            }
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
            {allTeachersNotInAGroup.length === 0 && !loading &&
              <p style={{ display: 'flex', justifyContent: 'center' }}>No hay profesores sin clase</p>
            }
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
          </div>

          <div className='tables-section'>
            {
              teachersByGroup.map((group) => {
                return (
                  <section className="table-container" key={group.id}>
                    <TableComponent
                      tableHeader={tableColumns}
                      tableContent={group.users}
                      showOptions={true}
                      notifyUpdate={(teacher) => handleAssign(teacher)}
                      textButton='Asignar profesor'
                      title={`Curso: ${group.name}`}
                    />
                  </section>
                )
              })
            }
            <section className="table-container">
              <TableComponent
                tableHeader={tableColumns}
                tableContent={allTeachersNotInAGroup}
                showOptions={true}
                notifyUpdate={(teacher) => handleAssign(teacher)}
                textButton='Asignar profesor'
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

export default AdminTeachers;