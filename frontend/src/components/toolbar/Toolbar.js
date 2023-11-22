import './Toolbar.css';

import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { useContext, useState } from 'react';
import { Popconfirm } from 'antd';
import { RolesContext } from '../../context/roles';

function Toolbar() {

  const navigate = useNavigate();
  const RoleContext = useContext(RolesContext);
  const [openConfirmLogout, setContifmLogout] = useState(false);

  const handleLogOut = () => {
    RoleContext.role = '';
    authService.logout().then(() => {
      navigate('/');
    });
  }

  return (
    <footer className="footer">
      <Popconfirm
        title="Seguro que quiere cerrar sesión?"
        open={openConfirmLogout}
        placement='top'
        onConfirm={handleLogOut}
        onCancel={() => setContifmLogout(false)}
        okText='Confirmar'
        cancelText='Cancelar'
      >
        <div><img src="/assets/icons/log-out.svg" alt='cerrar sesión' onClick={() => setContifmLogout(true)} /></div>
      </Popconfirm>
      <div><img src="/assets/icons/home.svg" alt='volver al inicio' onClick={() => authService.navigateByRole(RoleContext.role, navigate)} /></div>
      <div><img src="/assets/icons/profile.svg" alt='ver perfil' onClick={() => navigate('/user')} /></div>
    </footer>
  );
}

export default Toolbar;