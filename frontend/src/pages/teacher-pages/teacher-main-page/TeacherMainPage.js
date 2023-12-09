import './TeacherMainPage.css';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import GroupComponent from '../../../components/group-teacher/GroupComponent';
import teacherGroupService from '../../../services/teacherGroup.service';
import { useEffect, useState } from 'react';
import { decodeToken } from '../../../utils/shared/globalFunctions';
import { LoadingOutlined } from '@ant-design/icons';

function TeacherMainPage() {

  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacher = decodeToken();

  const getAllGroups = async () => {
    const groupArray = await teacherGroupService.getAllGroupsAssignedToTeacher(teacher.id);
    setAllGroups(groupArray);
    setLoading(false);
  }

  useEffect(() => {
    getAllGroups();
  }, []);

  const showGroups = () => (
    allGroups.map((item, index) =>
      <GroupComponent key={index} group={item.group} index={index} />
    )
  )

  return (
    <div className="teacher-page">
      <Header pageName='Tus cursos' />
      <p>
        <a href='/assets/help/Ayuda.html' target='blank'>Ayuda</a>
      </p>
      <h2>Tus cursos</h2>
      <div className='teacher-page-main'>
        {loading &&
          <LoadingOutlined style={{ fontSize: 60, color: '#08c', display: 'flex', justifyContent: 'center' }} />
        }
        {showGroups()}
      </div>
      <Toolbar />
    </div>
  );
}

export default TeacherMainPage;