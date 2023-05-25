import { useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// TODO set the component
const AuthRoutes = ({ component: RouteComponent, ...rest }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return navigate("/login");
  }, [navigate, currentUser]);

  // const Element = currentUser ? RouteComponent : SignIn;
  return <Route {...rest} element={<RouteComponent />} />;
};

export default AuthRoutes;
