import { useNavigate } from 'react-router-dom';
import './StudentCard.css';
import { Button } from 'antd';

function StudentCard(props) {
  const student = props.student;
  const assignStudent = props.assignStudent;

  const navigate = useNavigate();

  const handleNavigate = (student) => {
    const studentStringified = JSON.stringify(student);
    navigate('/admin/students/assign/' + studentStringified);
  }

  if (assignStudent) {
    return (
      <div className='student-card'>
        <span>{student.username}</span>
        <Button onClick={() => handleNavigate(student)}>Asignar</Button>
      </div>
    );
  }

  return (
    <div className='student-card'>
      <span>{student.username}</span>
    </div>
  );
}

export default StudentCard;