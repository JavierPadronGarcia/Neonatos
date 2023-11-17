import './Login.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { Button, Input, message, notification } from 'antd';
import { useContext, useState } from 'react';
import UserRolesContext from '../../utils/UserRoleContext';

function Login() {

  const RoleContext = useContext(UserRolesContext);
  const navigate = useNavigate();

  const logged = authService.isLoggedIn();

  const [inputNameStatus, setInputNameStatus] = useState('');
  const [inputPasswdStatus, setInputPasswdStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const checkAllInputsFail = (username, password) => {
    if (!username && !password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputNameStatus('error');
      setInputPasswdStatus('error');
      setLoading(false);
    }
  }

  const checkUsernameFail = (username, password) => {
    if (!username && password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputNameStatus('error');
      setLoading(false);
    }
  }

  const checkPasswordFail = (username, password) => {
    if (username && !password) {
      message.warning("Por favor, Rellena todos los campos", 5,)
      setInputPasswdStatus('error');
      setLoading(false);
    }
  }

  const handleLogin = (username, password) => {
    authService.login({ username: username, password: password }).then((role) => {
      RoleContext.role = role;
      message.success({
        content: `Sesión iniciada correctamente`,
        duration: 1,
      })
      setLoading(false);
    }).catch((err) => {
      loginErrors(err);
      setLoading(false);
    })
  }

  const loginErrors = (err) => {
    if (!err.response) {
      notification.error({
        message: 'No se ha podido iniciar sesión',
        description: "Puede que no tenga conexión? Verifique su red y vuelva a intentarlo.",
        placement: 'top',
      });
    }

    if (err.response && err.response.status === 401) {
      notification.error({
        message: 'No se ha podido iniciar sesión',
        description: "El usuario o la contraseña son correctos?",
        placement: 'top',
        duration: 5
      });
    }
  }

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    const username = e.target.user.value;
    const password = e.target.password.value;

    setInputNameStatus('');
    setInputPasswdStatus('');

    notification.destroy();

    checkAllInputsFail(username, password);
    checkUsernameFail(username, password);
    checkPasswordFail(username, password);

    if (username && password) {
      handleLogin(username, password);
    }
  }

  if (logged) {
    const role = RoleContext.role;
    authService.navigateByRole(role, navigate);
    return (
      <div className="login-page">
        <header>
          <h1>Sesión iniciada, redirigiendo...</h1>
        </header>
      </div>
    );
  }

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
                style={{ background: "#D9D9D9" }}
                name="user"
                id="user"
                placeholder="Usuario"
              />
            </label>
            <label className="input-label">
              <Input.Password
                status={inputPasswdStatus}
                style={{ background: "#D9D9D9" }}
                name="password"
                id="password"
                placeholder="Contraseña"
              />
            </label>
          </div>
          <label>
            <Button className='button' htmlType='submit' loading={loading}>Iniciar sesion</Button>
          </label>
        </form>
      </main>
    </div>
  );
}


export default Login;