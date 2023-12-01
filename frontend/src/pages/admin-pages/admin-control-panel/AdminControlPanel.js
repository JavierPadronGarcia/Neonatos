import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import './AdminControlPanel.css';
import { useNavigate } from 'react-router-dom';
import TabsComponent from '../../../components/tabs/TabsComponent';

function AdminControlPanel() {

  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="admin-control-panel-page">
        <header>
          <h2>Panel de Control</h2>
          <TabsComponent pageType='admin' keySelected='1' />
        </header>
        <main className='buttons-section'>
          <div className='first-row'>
            <div className="card-button" onClick={() => navigate('/admin/groups')}>
              <div><img src='/assets/icons/groups.svg' alt='ir a grupos' /></div>
              <span>Cursos</span>
            </div>
            <div className="card-button" onClick={() => navigate('/admin/teachers')}>
              <div><img src='/assets/icons/teachers.svg' alt='ir a profesorado' /></div>
              <span>Profesorado</span>
            </div>
          </div>
          <div className='second-row'>
            <div className="card-button" onClick={() => navigate('/admin/students')}>
              <div><img src='/assets/icons/students.svg' alt='ir a alumnado' /></div>
              <span>Alumnado</span>
            </div>
            <div className="card-button" onClick={() => navigate('/admin/directors')}>
              <div><img src='/assets/icons/directors.svg' alt='ir a dirección' /></div>
              <span>Dirección</span>
            </div>
          </div>
        </main>
      </div>
      <Toolbar />
    </>
  );
}

export default AdminControlPanel;