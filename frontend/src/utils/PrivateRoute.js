import { useState } from "react";
import authService from "../services/auth.service";
import { Outlet, useNavigate } from "react-router-dom";

function PrivateRoute(props) {

  const navigate = useNavigate();
  const [changePage, setChangePage] = useState();

  async function checkRole() {
    let enter = false;
    if (!props.logged) {
      return enter;
    } else {
      const role = await authService.getMyRole();
      if (role !== props.permittedRole) {
        authService.navigateByRole(role, navigate);
        return false;
      } else {
        return true;
      }
    }
  }

  checkRole().then(accessGranted => {
    setChangePage(accessGranted);
  });

  if (changePage) {
    return <Outlet />
  }
}

export default PrivateRoute;