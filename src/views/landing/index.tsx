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
  { title: "Albums", src: album, text: "Check Memories made" },
  { title: "Comments", src: comment, text: "What do you think?" },
  { title: "Photos", src: photo, text: "Let's take more" },
  { title: "Posts", src: post, text: "Writing clears the mind" },
  { title: "Todos", src: todo, text: "Check your checklist" },
  { title: "Users", src: user, text: "Who's on the platform" },
];

const Home = () => {
  const socket = useContext(WebSocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (data:any) => {
      console.log("Listening to onMessage");
      console.log({ data });
    });

    return () => {
      console.log("Un-registering events");
      socket.off("connect");
      socket.off("onMessage");
    };
  });
  console.log("hello World");
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
          JSON Placeholder: React Redux
        </Typography>
        <Grid container alignItems={"center"} spacing={4}>
          {sections.map((item) => (
            <Grid
              item
              xs={11}
              md={4}
              component={RouterLink}
              to={`/${item.title.toLowerCase()}`}
              key={item.title}
              style={{ color: "#61dafb" }}
            >
              <Paper elevation={10} sx={{ padding: "20px" }}>
                <Typography variant={"h4"} component={"h1"}>
                  {item.title}
                </Typography>
                <img
                  src={item.src}
                  style={{
                    height: "20vmin",
                    pointerEvents: "none",
                  }}
                  alt="logo"
                />
                <Typography variant={"subtitle1"} component={"p"}>
                  {item.text}
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
