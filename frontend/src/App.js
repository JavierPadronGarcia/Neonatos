import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
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
import { RolesContext } from './context/roles';
import GroupDetails from './pages/admin-pages/group-details/GroupDetails';
import UserPage from './pages/user-page/UserPage';
import { jwtDecode } from 'jwt-decode';

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

          <Route path="/admin/control-panel" element={<AdminControlPanel />} />
          <Route path="/admin/groups" element={<Groups />} />
          <Route path="/admin/groups/update/:name/:id" element={<UpdateGroup />} />
          <Route path="/admin/groups/add-group" element={<AddGroup />} />
          <Route path="/admin/groups/details/:id/:name" element={<GroupDetails />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/students/assign/:student" element={<AssignStudentPage />} />
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin/teachers/assign/:teacher" element={<AssignTeacherPage />} />
          <Route path="/admin/directors" element={<AdminDirectorsPage />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
