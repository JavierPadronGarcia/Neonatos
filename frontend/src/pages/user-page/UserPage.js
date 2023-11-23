import './UserPage.css';
import { Avatar, Button, Flex, Input, Modal, Upload, message } from "antd";
import Header from "../../components/Header/Header";
import Toolbar from "../../components/toolbar/Toolbar";
import { jwtDecode } from 'jwt-decode';
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import usersService from "../../services/users.service";
import { backendImageEndpoint } from '../../consts/backendEndpoints';

function UserPage() {

  const [user, setUser] = useState({});
  const [timerVisibility, setTimerVisibility] = useState(false);
  const [editImageVisibility, setEditImageVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    const tokenDecoded = jwtDecode(token);
    const user = await usersService.getUserById(tokenDecoded.id);
    setUser(user);
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  const handleUpdateImage = (image) => {
    console.log(image)
  }

  const changeModalVisibility = () => {
    setEditImageVisibility(true);
  }

  const showUploader = () => {
    return (
      <Flex justify='center' align='center'>
        <div id='image-preview'>
          <img
            src={`${backendImageEndpoint}/${user.filename}`}
            alt={`imagen del usuario ${user.username}`}
          />
        </div>
      </Flex>
    );
  }

  const previewImage = (event) => {
    const file = event.target.files[0];
    const src = URL.createObjectURL(file);
    const preview = document.getElementById('image-preview');
    preview.src = src;
  }

  const showModal = () => {
    return (
      <Modal
        title=""
        centered
        open={editImageVisibility}
        onOk={() => handleUpdateImage()}
        onCancel={() => setEditImageVisibility(false)}
        className='modal-container'
      >
        <div className='modal-content'>
          {showUploader()}
          <input
            type='file'
            id='file-input'
            accept='.jpg, .jpeg, .png, .svg'
            onChange={(event) => previewImage(event)}
          />
          <Input placeholder='nombre de usuario' />
        </div>
      </Modal>
    );
  }

  return (
    <div className="user-page">
      <Header />
      <div className="user-page-main">
        <div className='avatar-container'>
          <div className='avatar'>
            <div className='avatar-edit'>
              {showModal()}
              <Button
                size='middle'
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => changeModalVisibility()}
                className='avatar-edit-button'
              />
            </div>
            {user.filename === ''
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

        <div className='auth-code-container'>
          {timerVisibility && <p>hola</p>}
          <Button onClick={() => setTimerVisibility(!timerVisibility)}>Generar código de autentificación</Button>
        </div>
      </div>
      <Toolbar />
    </div>
  );
}

export default UserPage;