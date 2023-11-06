import './Login.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import { message } from 'antd';

function Login() {

  const navigate = useNavigate();

  const logged = authService.isLoggedIn();


  const login = (e) => {
    e.preventDefault();

    authService.login({ username: e.target.user.value, password: e.target.password.value }).then((role) => {
      authService.navigateByRole(role, navigate);
      message.success({
        content: `Sesión iniciada correctamente`,
        duration: 1,
      })
    })
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
                <input name="user" id="user" type="text" placeholder="Usuario" />
              </label>
              <label className="input-label">
                <input name="password" id="password" type="password" placeholder="Contraseña" />
              </label>
            </div>
            <label>
              <button className="button">Iniciar sesión</button>
            </label>
          </form>
        </main>
      </div>
    );
  }
}
export default Login;