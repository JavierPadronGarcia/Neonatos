import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useRef, useState } from 'react';
import { RolesContext } from '../../context/roles';
import authService from '../../services/auth.service';
import { Popconfirm } from 'antd';

function Header({ pageName }) {
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const RoleContext = useContext(RolesContext);
  const [openConfirmLogout, setContifmLogout] = useState(false);

  const handleLogOut = () => {
    RoleContext.role = '';
    authService.logout().then(() => {
      navigate('/');
    });
  }
  const toggleMenu = () => {
    const menu = menuRef.current;
    menu.classList.toggle('expanded');
  };

  return (
    <>
      <header className="header-component">
        <div className='page-name'>
          {pageName}
        </div>
        <div className='content'>
          <div className='logo-name'>
            <h1>MetaHospitalFP</h1>
          </div>
          <div className='user-icon'>
            <img
              src="/assets/icons/profile.svg"
              alt='ver información del perfil'
              onClick={() => toggleMenu()}
            />
          </div>
        </div>
      </header>
      <nav className='more-info' ref={menuRef}>
        <ul>
          <li onClick={() => navigate('/myUser')}>
            <span> Mi Perfil</span>
            <UserOutlined className='icon' />
          </li>
          <Popconfirm
            title="Seguro que quiere cerrar sesión?"
            open={openConfirmLogout}
            placement='leftBottom'
            onConfirm={handleLogOut}
            onCancel={() => setContifmLogout(false)}
            okText='Confirmar'
            cancelText='Cancelar'
          >
            <li onClick={() => setContifmLogout(true)}>
              <span>Cerrar Sesión</span>
              <LogoutOutlined className='icon' />
            </li>
          </Popconfirm>
        </ul>
      </nav>
    </>
  );
}


export default Header;