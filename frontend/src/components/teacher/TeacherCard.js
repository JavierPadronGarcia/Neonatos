import { useNavigate } from 'react-router-dom';
import './TeacherCard.css';
import { Button } from 'antd';

function TeacherCard(props) {
  const teacher = props.teacher;
  const assignTeacher = props.assignTeacher;

  const navigate = useNavigate();

  const handleNavigate = (teacher) => {
    const teacherStringified = JSON.stringify(teacher);
    navigate('/admin/teachers/assign/' + teacherStringified);
  }

  if (assignTeacher) {
    return (
      <item className='teacher-card'>
        <span>{teacher.username}</span>
        <Button onClick={() => handleNavigate(teacher)}>Asignar</Button>
      </item>
    );
  }

  return (
    <item className='teacher-card'>
      <span>{teacher.username}</span>
    </item>
  );
}

export default TeacherCard;