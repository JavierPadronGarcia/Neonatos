import './UserPage.css';
import { Avatar, Button, Flex, Image, Input, Modal, message } from "antd";
import Header from "../../components/Header/Header";
import Toolbar from "../../components/toolbar/Toolbar";
import { jwtDecode } from 'jwt-decode';
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import usersService from "../../services/users.service";
import { backendImageEndpoint } from '../../consts/backendEndpoints';
import { noConnectionError } from '../../utils/shared/errorHandler';

function UserPage() {

  const [user, setUser] = useState({});
  const [timerVisibility, setTimerVisibility] = useState(false);
  const [editImageVisibility, setEditImageVisibility] = useState(false);

  const inputNameRef = useRef(null);
  const fileUpdateRef = useRef(null);


  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    const tokenDecoded = jwtDecode(token);
    const user = await usersService.getUserById(tokenDecoded.id);
    setUser(user);
  }

  useEffect(() => {
    getUserInfo();
  }, [])

  const handleUpdateUser = () => {

    let inputNameValue = inputNameRef.current.input.value;
    let fileUpdateValue = fileUpdateRef.current.files[0];
    const prevFilename = user.filename === '' ? null : user.filename;

    if (!inputNameValue && !fileUpdateValue) {
      message.error('para actualizar debes cambiar algo', 3);
    }

    if (!inputNameValue && fileUpdateValue) {
      message.loading('actualizando...');
      usersService.updateUserWithImage(null, fileUpdateValue, prevFilename).then(response => {
        message.destroy();
        setEditImageVisibility(false);
        message.success('Imagen actualizada correctamente', 2);
        getUserInfo();
      }).catch(err => {
        message.destroy();
        if (!err.response) {
          noConnectionError();
        }
      });
    }

    if (inputNameValue && !fileUpdateValue) {
      message.loading('actualizando...');
      usersService.updateUserWithoutImage(inputNameValue, user.id).then(response => {
        message.destroy();
        setEditImageVisibility(false);
        message.success('Nombre actualizado correctamente', 2);
        getUserInfo();
      }).catch(err => {
        message.destroy();
        if (!err.response) {
          noConnectionError();
        }
      });
    }

    if (inputNameValue && fileUpdateValue) {
      message.loading('actualizando...');
      usersService.updateUserWithImage(inputNameValue, fileUpdateValue, prevFilename).then(response => {
        message.destroy();
        setEditImageVisibility(false);
        message.success('Nombre e imagen actualizados correctamente', 2);
        getUserInfo();
      }).catch(err => {
        message.destroy();
        if (!err.response) {
          noConnectionError();
        }
      });
    }

    inputNameValue = '';
    fileUpdateValue = null;
  }

  const changeModalVisibility = () => {
    setEditImageVisibility(true);
  }

  const showUploader = () => {
    return (
      <Flex justify='center' align='center'>
        <Avatar
          size={110}
          className='avatar-container'
          icon={
            <img
              src='/assets/icons/userOutlined.svg'
              alt={`imagen del usuario ${user.username}`}
              id='image-preview'
            />
          }
        />
      </Flex>
    );
  }

  const previewImage = (event) => {
    if (event.target.files[0]) {
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = URL.createObjectURL(event.target.files[0]);
      imagePreview.onload = () => URL.revokeObjectURL(imagePreview.src);
    }
  }

  const showModal = () => {
    return (
      <Modal
        title=""
        centered
        open={editImageVisibility}
        onOk={(event) => handleUpdateUser(event)}
        onCancel={() => setEditImageVisibility(false)}
        className='modal-container'
      >
        <h3 style={{ textAlign: 'center' }}>Edición de tu perfil</h3>
        <div className='modal-content'>
          {showUploader()}
          <div className='edit-images'>
            <label className='label-for-file quit-image' onClick={() => fileUpdateRef.current.files[0] = null}>
              Quitar imagen
            </label>
            
            <label htmlFor='file-input' className='label-for-file'>
              <input
                type='file'
                ref={fileUpdateRef}
                id='file-input'
                accept='.jpg, .jpeg, .png, .svg'
                onChange={(event) => previewImage(event)}
              />
              Cambiar imagen
            </label>


          </div>
          <Input placeholder='nombre de usuario' ref={inputNameRef} />
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