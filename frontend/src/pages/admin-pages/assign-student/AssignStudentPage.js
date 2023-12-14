import './AssignStudentPage.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";
import Header from "../../../components/Header/Header";
import Toolbar from "../../../components/toolbar/Toolbar";
import Group from "../../../components/group/Group";
import GoBack from "../../../components/go-back/GoBack";
import groupsService from "../../../services/groups.service";
import groupEnrolementService from "../../../services/groupEnrolement.service";
import { noConnectionError } from "../../../utils/shared/errorHandler";
import TableComponent from '../../../components/table/TableComponent';

function AssignStudentPage() {
  const navigate = useNavigate();
  const params = useParams();
  const student = JSON.parse(params.student);
  const [availableGroups, setAvailableGroups] = useState([]);

  const getAllGroups = async () => {
    try {
      const allAvailableGroups = await groupsService.getAllGroups();
      setAvailableGroups(allAvailableGroups);
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  useEffect(() => {
    getAllGroups();
  }, [])

  const assignStudent = (group) => {
    groupEnrolementService.assignStudentToGroup(student.id, group.id).then(response => {
      message.success({
        content: `${student.username} asignado correctamente a la clase ${group.name}`,
        duration: 2,
      })
      navigate('/admin/students');
    }).catch(err => {
      if (!err.response) {
        noConnectionError();
      }
    });
  }

  const tableColumns = [
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
  ]

  return (
    <div className="admin-students-assign-page">
      <Header pageName='Administración' />
      <GoBack link='/admin/students' alt='volver a todo el alumnado' />
      <div className="admin-students-assign-container">
        <header>
          <h2>Cursos disponibles</h2>
        </header>
        <main>
          <div className='student-mobile-format'>
            <h3>Asignando al estudiante:<br />{student.username}</h3>
            <section className="admin-students-assign-page-groups">
              {availableGroups.map((group, index) => {
                return (
                  <Group
                    key={index}
                    group={group}
                    assign={true}
                    notifyAssign={() => assignStudent(group)}
                  />
                )
              })}
            </section>
          </div>

          <section className='table-section'>
            <h3>Asignando a {student.username}</h3>
            <TableComponent
              tableHeader={tableColumns}
              tableContent={availableGroups}
              showOptions={true}
              textButton='Asignar a este curso'
              notifyUpdate={(group) => assignStudent(group)}
              title='Cursos'
            />
          </section>
        </main>
      </div>
      <Toolbar />
    </div>
  )
}

export default AssignStudentPage;