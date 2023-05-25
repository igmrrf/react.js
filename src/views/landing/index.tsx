import { Box, Grid, Paper, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import album from "../../assets/album.svg";
import comment from "../../assets/comment.svg";
import photo from "../../assets/photo.svg";
import post from "../../assets/post.svg";
import todo from "../../assets/todo.svg";
import user from "../../assets/user.svg";
import { WebSocketContext } from "../../context/WebSocketContext";

const sections = [
  {
    title: "Albums",
    testId: "album-test",
    src: album,
    text: "Check memories made",
  },
  {
    title: "Comments",
    testId: "comment-test",
    src: comment,
    text: "What do you think?",
  },
  {
    title: "Photos",
    testId: "photo-test",
    src: photo,
    text: "Let's take more",
  },
  {
    title: "Posts",
    testId: "post-test",
    src: post,
    text: "Writing clears the mind",
  },
  {
    title: "Todos",
    testId: "todo-test",
    src: todo,
    text: "Check your checklist",
  },
  {
    title: "Users",
    testId: "user-test",
    src: user,
    text: "Who's on the platform",
  },
];

const Home = () => {
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (data: unknown) => {
      console.log("Listening to onMessage");
      console.log({ data });
    });

    return () => {
      console.log("Un-registering events");
      socket.off("connect");
      socket.off("onMessage");
    };
  });
  return (
    <div style={{ textAlign: "center" }}>
      <Box sx={{ paddingRight: "40px", paddingLeft: "40px" }}>
        <Typography
          variant={"h3"}
          component={"h1"}
          sx={{
            fontFamily: "FiraCode",
            fontSize: "calc(16px + 3vmin)",
            paddingBottom: (theme) => theme.spacing(2),
            paddingTop: (theme) => theme.spacing(2),
          }}
        >
          {import.meta.env.VITE_TITLE}
        </Typography>
        <Grid container alignItems={"center"} spacing={4}>
          {sections.map((section) => (
            <Grid
              item
              xs={11}
              md={4}
              component={RouterLink}
              to={`/${section.title.toLowerCase()}`}
              key={section.title}
              style={{ color: "#61dafb" }}
              test-id={section.testId}
            >
              <Paper elevation={10} sx={{ padding: "20px" }}>
                <Typography variant={"h4"} component={"h1"}>
                  {section.title}
                </Typography>
                <img
                  src={section.src}
                  style={{
                    height: "20vmin",
                    pointerEvents: "none",
                  }}
                  alt="logo"
                />
                <Typography variant={"subtitle1"} component={"p"}>
                  {section.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
