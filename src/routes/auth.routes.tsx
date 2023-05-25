import React, { useContext, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// TODO set the component
const AuthRoutes = ({
  component,
  ...rest
}: {
  component: () => React.JSX.Element;
}) => {
  const navigate = useNavigate();
  const RouteComponent = component;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) return navigate("/login");
  }, [navigate, currentUser]);

  return <Route {...rest} element={<RouteComponent />} />;
};

export default AuthRoutes;
