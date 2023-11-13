import { useContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { Outlet, useNavigate } from "react-router-dom";
import UserRolesContext from "./UserRoleContext";

function PrivateRoute(props) {

  const navigate = useNavigate();
  const [changePage, setChangePage] = useState();
  const RoleContext = useContext(UserRolesContext);

  async function checkRole() {
    const role = RoleContext.role;

    if (!props.logged) {
      navigate('/');
      return false;
    }

    if (role !== props.permittedRole) {
      authService.navigateByRole(role, navigate);
      return false;
    }

    return true;
  }

  useEffect(() => {
    const accessGranted = checkRole();
    setChangePage(accessGranted)
  }, [])

  if (changePage) {
    return <Outlet />
  }
}

export default PrivateRoute;