import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { RolesContext } from './context/roles';
import Login from './pages/login/Login';
import PrivateRoute from './utils/PrivateRoute';
import authService from './services/auth.service';
import AdminControlPanel from './pages/admin-pages/admin-control-panel/AdminControlPanel';
import Groups from './pages/admin-pages/groups/Groups';
import UpdateGroup from './pages/admin-pages/update-group/UpdateGroup';
import AddGroup from './pages/admin-pages/add-group/AddGroup';
import AdminStudents from './pages/admin-pages/admin-students/AdminStudents';
import AssignStudentPage from './pages/admin-pages/assign-student/AssignStudentPage';
import AdminTeachers from './pages/admin-pages/admin-teachers/AdminTeachers';
import AssignTeacherPage from './pages/admin-pages/assign-teacher/AssignTeacherPage';
import AdminDirectorsPage from './pages/admin-pages/admin-directors/AdminDirectorsPage';
import GroupDetails from './pages/admin-pages/group-details/GroupDetails';
import UserPage from './pages/user-page/UserPage';
import TeacherMainPage from './pages/teacher-pages/teacher-main-page/TeacherMainPage';
import TeacherGroupPage from './pages/teacher-pages/teacher-group-page/TeacherGroupPage';
import TeacherActivitiesPage from './pages/teacher-pages/teacher-activities-page/TeacherActivitiesPage';

function App() {

  const logged = authService.isLoggedIn();
  const roles = useContext(RolesContext);

  if (logged) {
    const token = localStorage.getItem('token');
    const tokenDecoded = jwtDecode(token);
    const role = tokenDecoded.role;
    roles.role = role;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute logged={logged} onlyLogged={true} />}>
          <Route path="/myUser" element={<UserPage />} />
        </Route>

        <Route element={<PrivateRoute permittedRole='admin' logged={logged} />}>
          <Route path='/admin'>
            <Route path="control-panel" element={<AdminControlPanel />} />
            <Route path="groups" element={<Groups />}></Route>
            <Route path="groups/update/:name/:id" element={<UpdateGroup />} />
            <Route path="groups/add-group" element={<AddGroup />} />
            <Route path="groups/details/:id/:name" element={<GroupDetails />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="students/assign/:student" element={<AssignStudentPage />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="teachers/assign/:teacher" element={<AssignTeacherPage />} />
            <Route path="directors" element={<AdminDirectorsPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute permittedRole='teacher' logged={logged} />}>

          <Route path="/teacher/main" element={<TeacherMainPage />} />
          <Route path="/teacher/main/group/:name/:id" element={<TeacherGroupPage />} />
          <Route path="/teacher/main/group/:name/:id/unit/:workUnitId/:workUnitName" element={<TeacherActivitiesPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
