import './UserPage.css';
import { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { backendImageEndpoint } from '../../consts/backendEndpoints';
import { jwtDecode } from 'jwt-decode';
import usersService from "../../services/users.service";
import Toolbar from "../../components/toolbar/Toolbar";
import Header from "../../components/Header/Header";
import ImageProfileUploader from '../../components/image-profile-uploader/ImageProfileUploader';
import AuthCodeGenerator from '../../components/auth-code-generator/AuthCodeGenerator';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { RolesContext } from '../../context/roles';
import { errorMessage, noConnectionError } from '../../utils/shared/errorHandler';

function UserPage() {

  const [user, setUser] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const [userImage, setUserImage] = useState('');
  const navigate = useNavigate();
  const rolesContext = useContext(RolesContext);

  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const tokenDecoded = jwtDecode(token);
      const user = await usersService.getUserById(tokenDecoded.id);
      setUser(user);
      setUserImage(user.filename || '');
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }

      if (err.response && err.code === 500) {
        errorMessage('No se ha podido encontrar su usuario', 'Intentalo de nuevo')
      }
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  const changeModalVisibility = () => {
    setModalVisibility(true);
  }

  return (
    <div className="user-page">
      <Header pageName='Mi perfil' />
      <div className="user-page-main">
        <div className='back-to-home'>
          <HomeOutlined onClick={() => authService.navigateByRole(rolesContext.role, navigate)} />
        </div>
        <div className='avatar-container'>
          <div className='avatar'>
            <div className='avatar-edit'>
              <ImageProfileUploader
                show={{ modalVisibility, setModalVisibility }}
                user={user}
                userImage={{ userImage, setUserImage }}
                updateUserInfo={() => { getUserInfo() }}
              />
              <Button
                size='middle'
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => changeModalVisibility()}
                className='avatar-edit-button'
              />
            </div>
            {user.filename === '' || !user.filename
              ? <Avatar size={110} icon={<UserOutlined />} />
              : <Avatar
                size={110}
                icon={
                  <img
                    src={`${backendImageEndpoint}/${user.filename}`}
                    alt={`imagen del usuario ${user.username}`}
                  />
                }
              />
            }
          </div>

          <div>
            <span>{user.username}</span>
          </div>
        </div>

        <AuthCodeGenerator user={user} />
      </div>
      <Toolbar />
    </div>
  );
}

export default UserPage;