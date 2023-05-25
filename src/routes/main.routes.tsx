import { lazy } from "react";
import Loadable from "../components/Loadable";
import Layout from "../layout";
import SignIn from "../views/auth/login";
import SignUp from "../views/auth/signup";
import Home from "../views/landing";
import Private from "../views/private/private";
const NotFound = Loadable(lazy(() => import("../containers/extra/not-found")));
const LoadingScreen = Loadable(
  lazy(() => import("../containers/extra/loading-screen"))
);
const Albums = Loadable(lazy(() => import("../views/albums")));
const Comments = Loadable(lazy(() => import("../views/comments")));
const Photos = Loadable(lazy(() => import("../views/photos")));
const Posts = Loadable(lazy(() => import("../views/posts")));
const Todos = Loadable(lazy(() => import("../views/todos")));
const Users = Loadable(lazy(() => import("../views/users")));

const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/404",
    element: (
      <Layout>
        <NotFound />
      </Layout>
    ),
  },
  {
    path: "/loading",
    element: (
      <Layout>
        <LoadingScreen />,
      </Layout>
    ),
  },
  {
    path: "/albums",
    element: (
      <Layout>
        <Albums />,
      </Layout>
    ),
  },
  {
    path: "/comments",
    element: (
      <Layout>
        <Comments />,
      </Layout>
    ),
  },
  {
    path: "/photos",
    element: (
      <Layout>
        <Photos />,
      </Layout>
    ),
  },
  {
    path: "/posts",
    element: (
      <Layout>
        <Posts />,
      </Layout>
    ),
  },
  {
    path: "/todos",
    element: (
      <Layout>
        <Todos />,
      </Layout>
    ),
  },
  {
    path: "/users",
    element: (
      <Layout>
        <Users />,
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/join",
    element: <SignUp />,
  },
  {
    path: "/private",
    element: <Private />,
  },
  {
    path: "*",
    element: (
      <Layout>
        <NotFound />,
      </Layout>
    ),
  },
];

export default routes;
