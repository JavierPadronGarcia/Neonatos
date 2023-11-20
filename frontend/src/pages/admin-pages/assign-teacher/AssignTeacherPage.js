import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { message, notification } from "antd";
import Header from "../../../components/Header/Header";
import Toolbar from "../../../components/toolbar/Toolbar";
import Group from "../../../components/group/Group";
import GoBack from "../../../components/go-back/GoBack";
import groupsService from "../../../services/groups.service";
import './AssignTeacherPage.css';
import teacherGroupService from "../../../services/teacherGroup.service";

function AssignTeacherPage() {
  const navigate = useNavigate();
  const params = useParams();
  const teacher = JSON.parse(params.teacher);
  const [availableGroups, setAvailableGroups] = useState([]);

  const getAllGroups = async () => {
    const allAvailableGroups = await groupsService.getAllGroups();
    setAvailableGroups(allAvailableGroups);
  }

  useEffect(() => {
    getAllGroups();
  }, [])

  const assignTeacher = (group) => {
    teacherGroupService.assignTeacherToGroup(teacher.id, group.id).then(response => {
      message.success({
        content: `${teacher.username} asignado correctamente a la clase ${group.name}`,
        duration: 2,
      })
      navigate('/admin/teachers');
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
    <div className="admin-teachers-assign-page">
      <Header />
      <GoBack link='/admin/teachers' alt='volver a todo el profesorado' />
      <div className="admin-teachers-assign-container">
        <header>
          <h2>Cursos disponibles</h2>
        </header>
        <main>
          <h3>Asignando al profesor/a:<br />{teacher.username}</h3>
          <section className="admin-teachers-assign-page-groups">
            {availableGroups.map((group, index) => {
              return (
                <Group
                  key={index}
                  name={group.name}
                  ident={group.id}
                  assign={true}
                  notifyAssign={() => assignTeacher(group)}
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

export default AssignTeacherPage;