import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./routes";

const GET_POSTS = gql`
  query GetPosts {
    user(username: "igmrrf") {
      publication {
        posts(page: 0) {
          _id
          coverImage
          slug
          title
          brief
        }
      }
    }
  }
`;

function App() {
  const [posts, setPosts] = useState([]);
  const { loading, error, data } = useQuery(GET_POSTS);

  useEffect(() => {
    if (!loading && !posts?.length) {
      setPosts(data);
    }
    if (error) {
      console.log({ error });
    }
  }, [loading, error, data, posts]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
