import './Login.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { Button, Input, message, notification } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { errorOnLogin, noConnectionError } from '../../utils/shared/errorHandler';
import { RolesContext } from '../../context/roles';
import { loginValidation } from '../../utils/shared/globalFunctions';

function Login() {

  const roles = useContext(RolesContext);
  const navigate = useNavigate();

  const logged = authService.isLoggedIn();

  const [inputNameStatus, setInputNameStatus] = useState('');
  const [inputPasswdStatus, setInputPasswdStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (username, password) => {
    authService.login({ username: username, password: password }).then((newRole) => {
      roles.role = newRole;
      message.success({
        content: `Sesión iniciada correctamente`,
        duration: 1,
      })
      authService.navigateByRole(newRole, navigate);
      setLoading(false);
    }).catch((err) => {
      loginErrors(err);
      setLoading(false);
    })
  }

  const loginErrors = (err) => {
    if (!err.response) {
      noConnectionError();
    }

    if (err.response &&
      (err.response.status === 401
        || err.response.status === 500)) {
      errorOnLogin();
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

    const isLoginValid = loginValidation(
      username, password,
      setInputNameStatus,
      setInputPasswdStatus,
      setLoading
    );

    if (isLoginValid) {
      handleLogin(username, password);
    }
  }

  useEffect(() => {
    if (logged) {
      authService.navigateByRole('admin', navigate);
    }
  }, [])


  return (
    < div className="login-page" >

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

    </div >

  );
}






export default Login;