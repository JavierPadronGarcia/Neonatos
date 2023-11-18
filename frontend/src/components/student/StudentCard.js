import './StudentCard.css';
import { Button } from 'antd';

function StudentCard(props) {

  const studentName = props.studentName;
  const assignStudent = props.assignStudent;

  const navigate = () => {

  }

  if (assignStudent) {
    return (
      <item className='student-card'>
        <span>{studentName}</span>
        <Button onClick={() => navigate()}>Asignar</Button>
      </item>
    );
  }


  return (
    <item className='student-card'>
      <span>{studentName}</span>
    </item>
  );
}

export default StudentCard;