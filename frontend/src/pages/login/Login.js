import './Login.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { Button, Input, message, notification } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';

function Login() {

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

    if (!username && !password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputNameStatus('error');
      setInputPasswdStatus('error');
    }

    if (!username && password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputNameStatus('error');
    }

    if (username && !password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputPasswdStatus('error');
    }

    if (username && password) {
      authService.login({ username: username, password: password }).then((role) => {
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
    authService.getMyRole().then(role => {
      authService.navigateByRole(role, navigate);
    })
    return (
      <div className="login-page">
        <header>
          <h1>Sesión iniciada, redirigiendo...</h1>
        </header>
      </div>
    );
  } else {
    return (
      <div className="login-page">
        <header>
          <h1>MetaHospitalFP</h1>
        </header>
        <main>

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
    );
  }
}

export default Login;