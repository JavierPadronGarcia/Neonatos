import './Toolbar.css';

import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

function Toolbar() {

  const navigate = useNavigate();

  const handleLogOut = () => {
    authService.logout().then(() => {
      navigate('/');
    });
  }

  return (
    <footer className="footer">
      <div><img src="/assets/icons/log-out.svg" alt='cerrar sesión' onClick={() => handleLogOut()} /></div>
      <div><img src="/assets/icons/home.svg" alt='volver al inicio' onClick={() => navigate('/groups')} /></div>
      <div><img src="/assets/icons/profile.svg" alt='ver perfil' onClick={() => navigate('/user')} /></div>
    </footer>
  );
}

export default Toolbar;