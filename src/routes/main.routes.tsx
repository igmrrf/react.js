import { lazy } from "react";
import Loadable from "../components/Loadable";
import Layout from "../layout";
import Home from "../views/landing";
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
    path: "*",
    element: (
      <Layout>
        <NotFound />,
      </Layout>
    ),
  },
];

export default routes;
