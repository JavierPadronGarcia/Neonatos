import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Groups from './pages/groups/Groups';
import AddGroup from './pages/add-group/AddGroup';
import UpdateGroup from './pages/update-group/UpdateGroup';
import PrivateRoute from './utils/PrivateRoute';
import UserRolesContext from './utils/UserRoleContext';
import authService from './services/auth.service';
import { useState } from 'react';

function App() {

  const [role, setRole] = useState('');

  const logged = authService.isLoggedIn();

  if (logged) {
    authService.getMyRole().then(role => {
      setRole(role);
    })
  }

  return (
    <UserRolesContext.Provider value={{ role: role }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute permittedRole='admin' logged={logged} />}>
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/update/:name/:id" element={<UpdateGroup />} />
            <Route path="/groups/add-group" element={<AddGroup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserRolesContext.Provider>

  );
}

export default App;
