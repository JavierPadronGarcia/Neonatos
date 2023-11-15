import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/login/Login';
import Groups from './pages/groups/Groups';
import AddGroup from './pages/add-group/AddGroup';
import UpdateGroup from './pages/update-group/UpdateGroup';
import PrivateRoute from './utils/PrivateRoute';
import UserRolesContext from './utils/UserRoleContext';
import authService from './services/auth.service';
import AdminControlPanel from './pages/admin-control-panel/AdminControlPanel';

function App() {

  const [role, setRole] = useState('');
  const logged = authService.isLoggedIn();

  if (logged) {
    authService.getMyRole().then(role => {
      setRole(role);
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <UserRolesContext.Provider value={{ role: role }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute permittedRole='admin' logged={logged} />}>
            <Route path="/admin/control-panel" element={<AdminControlPanel />} />
            <Route path="/admin/groups" element={<Groups />} />
            <Route path="/admin/groups/update/:name/:id" element={<UpdateGroup />} />
            <Route path="/admin/groups/add-group" element={<AddGroup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserRolesContext.Provider>
  );
}

export default App;
