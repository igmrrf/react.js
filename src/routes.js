import React, { Suspense, Fragment, lazy } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import LoadingScreen from "./components/loading-screen.component";
import Home from "./containers/home.container";

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Component = route.component;
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Fragment>
                <Component {...props} />
              </Fragment>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
);

const routes = [
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("./containers/not-found.container")),
  },
  {
    exact: true,
    path: "/loading",
    component: lazy(() => import("./components/loading-screen.component")),
  },
  {
    exact: true,
    path: "/albums",
    component: lazy(() => import("./containers/albums/albums.container")),
  },
  {
    exact: true,
    path: "/comments",
    component: lazy(() => import("./containers/comments/comments.container")),
  },
  {
    exact: true,
    path: "/photos",
    component: lazy(() => import("./containers/photos/photos.container")),
  },
  {
    exact: true,
    path: "/posts",
    component: lazy(() => import("./containers/posts/posts.container")),
  },
  {
    exact: true,
    path: "/todos",
    component: lazy(() => import("./containers/todos/todos.container")),
  },
  {
    exact: true,
    path: "/users",
    component: lazy(() => import("./containers/users/users.container")),
  },
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "*/*",
    exact: true,
    component: () => <Redirect to={"/404"} />,
  },
];

export default routes;
