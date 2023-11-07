import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Groups from './pages/groups/Groups';
import AddGroup from './pages/add-group/AddGroup';
import UpdateGroup from './pages/update-group/UpdateGroup';
import PrivateRoute from './utils/PrivateRoute';
import authService from './services/auth.service';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute permittedRole='admin' logged={authService.isLoggedIn()} />}>
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/update/:name/:id" element={<UpdateGroup />} />
          <Route path="/groups/add-group" element={<AddGroup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
