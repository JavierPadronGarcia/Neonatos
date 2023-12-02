import './GroupDetails.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import Header from "../../../components/Header/Header";
import Toolbar from "../../../components/toolbar/Toolbar";
import GoBack from '../../../components/go-back/GoBack';
import StudentCard from '../../../components/student/StudentCard';
import TeacherCard from '../../../components/teacher/TeacherCard';
import groupEnrolementService from '../../../services/groupEnrolement.service';
import teacherGroupService from '../../../services/teacherGroup.service';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import TableComponent from '../../../components/table/TableComponent';

function GroupDetails() {
  const params = useParams();
  const groupId = params.id;
  const groupName = params.name;

  const [displayVisibility, setDisplayVisibility] = useState({ teachers: true, students: false });
  const [groupData, setGroupData] = useState({ teachers: [], students: [] });
  const [groupDataTable, setGroupDataTable] = useState({ teachers: [], students: [] })
  const navigate = useNavigate();

  const changeTeachersVisibility = () => {
    setDisplayVisibility(prevState => ({
      ...prevState,
      teachers: !prevState.teachers
    }));
  }

  const changeStudentsVisibility = () => {
    setDisplayVisibility(prevState => ({
      ...prevState,
      students: !prevState.students
    }));
  }

  const getGroupData = async () => {
    try {
      const students = await groupEnrolementService.getAllStudentsInAGroup(groupId);
      const teachers = await teacherGroupService.getAllTeachersInAGroup(groupId);
      setGroupData({ teachers: teachers, students: students });
      setGroupDataTable({ teachers: adaptArray(teachers), students: adaptArray(students) })
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  useEffect(() => {
    getGroupData();
  }, []);

  const showTeachers = () => {
    return (
      <div className='teacher-container'>
        {groupData.teachers.map(teacher => {
          return <TeacherCard teacher={teacher.User} key={teacher.User.id} />
        })}
      </div>
    );
  }

  const adaptArray = (array) => {
    const newArray = [];

    array.map(data => {
      newArray.push(data.User)
    })
    return newArray;
  }

  const showStudents = () => {
    return (
      <div className='student-container'>
        {groupData.students.map(student => {
          return <StudentCard student={student.User} key={student.User.id} />
        })}
      </div>
    );
  }

  const assignTeacher = (teacher) => {
    const teacherStringified = JSON.stringify(teacher);
    navigate('/admin/teachers/assign/' + teacherStringified);
  }

  const assignStudent = (student) => {
    const studentStringified = JSON.stringify(student);
    navigate('/admin/students/assign/' + studentStringified);
  }

  const tableColumns = [
    { title: 'Usuario', dataIndex: 'username', key: 'username', align: 'center' },
  ]

  return (
    <div className="group-details-page">
      <Header pageName='Administración' />
      <GoBack link='/admin/groups' alt='go to all groups' />
      <div className="group-details-page-main">
        <header>
          <h2>{groupName}</h2>
        </header>
        <main>
          <div className='group-mobile-format'>
            <div className='teachers'>
              <div>
                <span>Profesorado</span>
                <span onClick={() => changeTeachersVisibility()}>
                  {displayVisibility.teachers
                    ? <CaretDownOutlined />
                    : <CaretUpOutlined />}
                </span>
              </div>
              {
                displayVisibility.teachers &&
                showTeachers()
              }
            </div>

            <div className='students'>
              <div>
                <span>Alumnado</span>
                <span onClick={() => changeStudentsVisibility()}>
                  {displayVisibility.students
                    ? <CaretDownOutlined />
                    : <CaretUpOutlined />}
                </span>
              </div>
              {
                displayVisibility.students &&
                showStudents()
              }
            </div>
          </div>
          <div className='table-section'>
            <section className='table-container'>
              <TableComponent
                tableHeader={tableColumns}
                tableContent={groupDataTable.teachers}
                showOptions={true}
                textButton='Asignar a otro curso'
                notifyUpdate={(teacher) => assignTeacher(teacher)}
                title='Profesorado'
              />
            </section>
            <section className='table-container'>
              <TableComponent
                tableHeader={tableColumns}
                tableContent={groupDataTable.students}
                showOptions={true}
                textButton='Asignar a otro curso'
                notifyUpdate={(student) => assignStudent(student)}
                title='Alumnado'
              />
            </section>
          </div>

        </main>
      </div>
      <Toolbar />
    </div>
  );
}

export default GroupDetails;