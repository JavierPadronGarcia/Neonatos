import './Toolbar.css';

import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import UserRolesContext from '../../utils/UserRoleContext';
import { useContext } from 'react';

function Toolbar() {

  const navigate = useNavigate();
  const RoleContext = useContext(UserRolesContext);

  const handleLogOut = () => {
    RoleContext.role = '';
    authService.logout().then(() => {
      navigate('/');
    });
  }

  return (
    <footer className="footer">
      <div><img src="/assets/icons/log-out.svg" alt='cerrar sesión' onClick={() => handleLogOut()} /></div>
      <div><img src="/assets/icons/home.svg" alt='volver al inicio' onClick={() => authService.navigateByRole(RoleContext.role, navigate)} /></div>
      <div><img src="/assets/icons/profile.svg" alt='ver perfil' onClick={() => navigate('/user')} /></div>
    </footer>
  );
}

export default Toolbar;