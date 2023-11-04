import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Groups from './pages/groups/Groups';
import AddGroup from './pages/add-group/AddGroup';
import UpdateGroup from './pages/update-group/UpdateGroup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/add-group" element={<AddGroup />} />
        <Route path="/groups/update/:name/:id" element={<UpdateGroup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
