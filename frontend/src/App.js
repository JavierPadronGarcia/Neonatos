import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Groups from './pages/groups/Groups';
import AddGroup from './pages/add-group/AddGroup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Groups />} />
        <Route path="/groups/add-group" element={<AddGroup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
