import './Login.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

function Login() {

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    console.log(e.target.user.value)
    console.log(e.target.password.value)

    authService.login({ username: e.target.user.value, password: e.target.password.value }).then(() => {
      console.log(localStorage.getItem("token"))
    })
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

export default Login;