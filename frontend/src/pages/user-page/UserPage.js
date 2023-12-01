import './UserPage.css';
import { useContext, useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
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

function UserPage() {

  const [user, setUser] = useState({});
  const [modalVisibility, setModalVisibility] = useState(false);
  const [userImage, setUserImage] = useState('');
  const navigate = useNavigate();
  const rolesContext = useContext(RolesContext);

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    const tokenDecoded = jwtDecode(token);
    const user = await usersService.getUserById(tokenDecoded.id);
    setUser(user);
    setUserImage(user.filename || '');
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  const changeModalVisibility = () => {
    setModalVisibility(true);
  }

  return (
    <div className="user-page">
      <Header />
      <div className="user-page-main">
        <div className='back-to-home'>
          <img
            src="/assets/icons/home.svg"
            alt='volver al inicio'
            onClick={() => authService.navigateByRole(rolesContext.role, navigate)}
          />
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