import { useRef, useState } from 'react';
import './ImageProfileUploader.css';
import { Avatar, Flex, Input, Modal, message } from "antd";
import { backendImageEndpoint } from '../../consts/backendEndpoints';
import { noConnectionError } from '../../utils/shared/errorHandler';
import usersService from "../../services/users.service";

function ImageProfileUploader(props) {

  const { modalVisibility, setModalVisibility } = props.show;
  const { userImage, setUserImage } = props.userImage;
  const [imageChanged, setImageChanged] = useState(false);
  const user = props.user;

  const inputNameRef = useRef(null);
  const fileUpdateRef = useRef(null);

  const showImagePreview = () => {
    return (
      <Flex justify='center' align='center'>
        {userImage === ''
          ? <Avatar
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
          : <Avatar
            size={110}
            className='avatar-container'
            icon={
              <img
                src={`${backendImageEndpoint}/${user.filename}`}
                alt={`imagen del usuario ${user.username}`}
                id='image-preview'
              />
            }
          />
        }
      </Flex>
    );
  }

  const updateUserInfo = () => {
    props.updateUserInfo();
  }

  const handleUpdateUser = () => {

    let inputNameValue = inputNameRef.current.input.value;
    let fileUpdateValue = fileUpdateRef.current.files[0];
    const prevFilename = user.filename === '' ? null : user.filename;

    if (!inputNameValue && !imageChanged) {
      message.error('para actualizar debes cambiar algo', 3);
    }

    if (!inputNameValue && imageChanged) {
      message.loading('actualizando...');
      usersService.updateUserWithImage(null, fileUpdateValue, prevFilename).then(response => {
        message.destroy();
        setModalVisibility(false);
        message.success('Imagen actualizada correctamente', 2);
        updateUserInfo();
        setImageChanged(false);
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
        setModalVisibility(false);
        message.success('Nombre actualizado correctamente', 2);
        updateUserInfo();
      }).catch(err => {
        message.destroy();
        if (!err.response) {
          noConnectionError();
        }
      });
    }

    if (inputNameValue && imageChanged) {
      message.loading('actualizando...');
      usersService.updateUserWithImage(inputNameValue, fileUpdateValue, prevFilename).then(response => {
        message.destroy();
        setModalVisibility(false);
        message.success('Nombre e imagen actualizados correctamente', 2);
        setImageChanged(false);
        updateUserInfo();
      }).catch(err => {
        message.destroy();
        if (!err.response) {
          noConnectionError();
        }
      });
    }
    inputNameValue = '';
    fileUpdateRef.current.value = null;
  }

  const previewImage = (event) => {
    if (event.target.files[0]) {
      const imagePreview = document.getElementById('image-preview');
      imagePreview.src = URL.createObjectURL(event.target.files[0]);
      imagePreview.onload = () => {
        URL.revokeObjectURL(imagePreview.src)
      };
      setUserImage(imagePreview.src)
      setImageChanged(true)
    }
  }

  const cancelUpdate = () => {
    setUserImage(user.filename || null);
    setModalVisibility(false);
    fileUpdateRef.current.value = null;
  }

  const quitImage = () => {
    fileUpdateRef.current.value = null;
    setImageChanged(true)
    setUserImage('');
  }

  return (
    <Modal
      title="Edición de tu perfil"
      centered
      open={modalVisibility}
      onOk={(event) => handleUpdateUser(event)}
      onCancel={() => cancelUpdate()}
      okText='Confirmar'
      cancelText='Cancelar'
      className='modal-container'
    >
      <div className='modal-content'>
        {showImagePreview()}
        <div className='edit-images'>

          {userImage !== '' &&
            <label className='label-for-file quit-image' onClick={() => quitImage()}>
              Quitar imagen
            </label>
          }
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


export default ImageProfileUploader;