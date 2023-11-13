import './Login.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { Button, Input, message, notification } from 'antd';
import { useContext, useState } from 'react';
import UserRolesContext from '../../utils/UserRoleContext';
import { UserOutlined } from '@ant-design/icons';
import Background from '../../components/background/Background';

function Login() {

  const RoleContext = useContext(UserRolesContext);
  const navigate = useNavigate();

  const logged = authService.isLoggedIn();

  const [inputNameStatus, setInputNameStatus] = useState('');
  const [inputPasswdStatus, setInputPasswdStatus] = useState('');

  const login = (e) => {
    e.preventDefault();
    const username = e.target.user.value;
    const password = e.target.password.value;

    setInputNameStatus('');
    setInputPasswdStatus('');

    notification.destroy();

    //all the inputs fail
    if (!username && !password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputNameStatus('error');
      setInputPasswdStatus('error');
    }

    //only username fails
    if (!username && password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputNameStatus('error');
    }

    //only password fails
    if (username && !password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputPasswdStatus('error');
    }

    //all inputs ok
    if (username && password) {
      authService.login({ username: username, password: password }).then((role) => {
        RoleContext.role = role;
        authService.navigateByRole(role, navigate);
        message.success({
          content: `Sesión iniciada correctamente`,
          duration: 1,
        })
      }).catch((err) => {
        notification.error({
          message: 'No se ha podido iniciar sesión',
          description: "El usuario o la contraseña son correctos?",
          placement: 'top',
          duration: 5
        });
      })
    }
  }

  if (logged) {
    console.log(RoleContext.role)
    authService.navigateByRole(RoleContext.role, navigate);
    return (
      <div className="login-page">
        <header>
          <h1>Sesión iniciada, redirigiendo...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className='main-page'>
      <Background />
      <div className="login-page">
        <div>
          <header className='login-page-header'>
            <div><img src='/assets/img/logo.png' alt='logo' /></div>
            <h1>MetaHospitalFP</h1>
          </header>
          <main className='login-page-main'>
            <form onSubmit={(e) => login(e)}>
              <div>
                <label className="input-label">
                  <Input
                    status={inputNameStatus}
                    name="user"
                    id="user"
                    placeholder="Usuario"
                    prefix={<UserOutlined />}
                  />
                </label>
                <label className="input-label">
                  <Input.Password
                    status={inputPasswdStatus}
                    name="password"
                    id="password"
                    placeholder="Contraseña"
                  />
                </label>
              </div>
              <label>
                <Button className='button' htmlType='submit'>Iniciar sesion</Button>
              </label>
            </form>
          </main>
        </div>
        <footer className='login-page-footer'>
          <img src='/assets/img/login-image.svg' alt='image' />
        </footer>
      </div>
    </div>
  );
}

export default Login;