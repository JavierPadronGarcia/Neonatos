import { useContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { Outlet, useNavigate } from "react-router-dom";
import { RolesContext } from "../context/roles";

function PrivateRoute(props) {

  const permittedRole = props.permittedRole;
  const onlyLogged = props.onlyLogged;
  const logged = localStorage.getItem('token') ? true : false

  const navigate = useNavigate();
  const [changePage, setChangePage] = useState();
  const rolesContext = useContext(RolesContext);

  const checkRole = () => {
    const role = rolesContext.role;

    if (!logged) {
      navigate('/');
      return false;
    }

    if (role !== permittedRole) {
      authService.navigateByRole(role, navigate);
      return false;
    }

    return true;
  }

  const checkIsLogged = () => {
    if (!logged) {
      navigate('/');
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (!onlyLogged) {
      //need a role to access
      const accessGranted = checkRole();
      setChangePage(accessGranted)
    } else {
      //don't need a role, only need to be logged
      const accessGranted = checkIsLogged();
      setChangePage(accessGranted);
    }
  }, [])

  if (changePage) {
    return <Outlet />
  }
}

export default PrivateRoute;