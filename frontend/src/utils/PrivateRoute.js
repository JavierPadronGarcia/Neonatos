import authService from "../services/auth.service";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute(props) {

  const navigate = useNavigate();

  async function checkRole() {
    let enter = false;
    if (!props.logged) {
      return enter;
    } else {
      authService.getMyRole().then((role) => {
        if (role !== props.permittedRole) {
          authService.navigateByRole(role, navigate);
          enter = false;
        } else {
          enter = true;
        }
        return enter;
      })

    }
  }

  checkRole().then(role => {
    console.log(role)
  });
  return <Outlet />;
}

export default PrivateRoute;