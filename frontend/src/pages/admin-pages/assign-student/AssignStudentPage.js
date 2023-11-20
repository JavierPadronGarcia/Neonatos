import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import Header from "../../../components/Header/Header";
import Toolbar from "../../../components/toolbar/Toolbar";
import Group from "../../../components/group/Group";
import GoBack from "../../../components/go-back/GoBack";
import groupsService from "../../../services/groups.service";
import groupEnrolementService from "../../../services/groupEnrolement.service";
import './AssignStudentPage.css';

function AssignStudentPage() {
  const navigate = useNavigate();
  const params = useParams();
  const student = JSON.parse(params.student);
  const [availableGroups, setAvailableGroups] = useState([]);

  const getAllGroups = async () => {
    const allAvailableGroups = await groupsService.getAllGroups();
    setAvailableGroups(allAvailableGroups);
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
        notification.error({
          message: 'No se pudo conectar con el servidor',
          description: "Puede que no tenga conexión? Verifique su red y vuelva a intentarlo.",
          placement: 'top',
        });
      }
    });
  }

  return (
    <div className="admin-students-assign-page">
      <Header />
      <GoBack link='/admin/students' alt='volver a todo el alumnado' />
      <div className="admin-students-assign-container">
        <header>
          <h2>Cursos disponibles</h2>
        </header>
        <main>
          <h3>Asignando al estudiante:<br />{student.username}</h3>
          <section className="admin-students-assign-page-groups">
            {availableGroups.map((group, index) => {
              return (
                <Group
                  key={index}
                  name={group.name}
                  ident={group.id}
                  assign={true}
                  notifyAssign={() => assignStudent(group)}
                />
              )
            })}
          </section>
        </main>
      </div>
      <Toolbar />
    </div>
  )
}

export default AssignStudentPage;