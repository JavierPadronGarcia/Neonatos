import './GroupDetails.css';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
import Header from "../../../components/Header/Header";
import Toolbar from "../../../components/toolbar/Toolbar";
import GoBack from '../../../components/go-back/GoBack';
import StudentCard from '../../../components/student/StudentCard';
import TeacherCard from '../../../components/teacher/TeacherCard';
import groupEnrolementService from '../../../services/groupEnrolement.service';
import teacherGroupService from '../../../services/teacherGroup.service';
import { noConnectionError } from '../../../utils/shared/errorHandler';
import TableComponent from '../../../components/table/TableComponent';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

function GroupDetails() {
  const params = useParams();
  const groupId = params.id;
  const groupName = params.name;

  const carouselTeacherRef = useRef(null);
  const carouselStudentRef = useRef(null);

  const [groupData, setGroupData] = useState({ teachers: [], students: [] });
  const [groupDataTable, setGroupDataTable] = useState({ teachers: [], students: [] })
  const navigate = useNavigate();

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
        <div style={{ width: '100%' }}>
          {groupData.teachers.length > 1 &&
            <>
              <LeftOutlined onClick={() => changePrev(carouselTeacherRef)} className='left-arrow' />
              <RightOutlined onClick={() => changeNext(carouselTeacherRef)} className='right-arrow' />
            </>
          }
          <Carousel ref={carouselTeacherRef}>
            {groupData.teachers.map(teacher => {
              return <TeacherCard teacher={teacher.User} key={teacher.User.id} />
            })}
          </Carousel>
        </div>
      </div >
    );
  }

  const adaptArray = (array) => {
    const newArray = [];

    array.map(data => {
      newArray.push(data.User)
    })
    return newArray;
  }

  const changePrev = (carouselRef) => {
    carouselRef.current.prev();
  }

  const changeNext = (carouselRef) => {
    carouselRef.current.next();
  }

  const showStudents = () => {
    return (
      <div className='student-container'>
        <div style={{ width: '100%' }}>
          {groupData.students.length > 1 &&
            <>
              <LeftOutlined onClick={() => changePrev(carouselStudentRef)} className='left-arrow' />
              <RightOutlined onClick={() => changeNext(carouselStudentRef)} className='right-arrow' />
            </>
          }
          <Carousel ref={carouselStudentRef}>
            {groupData.students.map(student => {
              return <StudentCard student={student.User} key={student.User.id} />
            })}
          </Carousel>
        </div>
      </div>
    );
  }

  const assignTeacher = (teacher) => {
    const adaptTeacherToNavigate = {
      id: teacher.id,
      username: teacher.username,
      role: teacher.role
    }
    const teacherStringified = JSON.stringify(adaptTeacherToNavigate);
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
              </div>
              {
                groupData.teachers.length > 0 &&
                showTeachers()
              }
            </div>

            <div className='students'>
              <div>
                <span>Alumnado</span>
              </div>
              {
                groupData.students.length > 0 &&
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