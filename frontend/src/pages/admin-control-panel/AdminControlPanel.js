import Header from '../../components/Header/Header';
import Toolbar from '../../components/toolbar/Toolbar';
import './AdminControlPanel.css';
import { useNavigate } from 'react-router-dom';

function AdminControlPanel() {

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="admin-control-panel-page">
        <header>
          <h1>Panel de control</h1>
        </header>
        <main className='buttons-section'>
          <div className='first-row'>
            <item className="card-button" onClick={() => navigate('/admin/groups')}>
              <div><img src='/assets/icons/groups.svg' alt='ir a grupos' /></div>
              <span>Cursos</span>
            </item>
            <item className="card-button" onClick={() => navigate('/admin/teachers')}>
              <div><img src='/assets/icons/teachers.svg' alt='ir a profesorado' /></div>
              <span>Profesorado</span>
            </item>
          </div>
          <div className='second-row'>
            <item className="card-button" onClick={() => navigate('/admin/students')}>
              <div><img src='/assets/icons/students.svg' alt='ir a alumnado' /></div>
              <span>Alumnado</span>
            </item>
            <item className="card-button" onClick={() => navigate('/admin/directos')}>
              <div><img src='/assets/icons/directors.svg' alt='ir a dirección' /></div>
              <span>Dirección</span>
            </item>
          </div>
        </main>
      </div>
      <Toolbar />
    </>
  );
}

export default AdminControlPanel;