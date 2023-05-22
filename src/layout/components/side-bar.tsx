import {
  AllInbox,
  Comment,
  Menu,
  People,
  Photo,
  PhotoLibrary,
  PlaylistAddCheck,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  Typography,
} from "@mui/material";
import clsx from "clsx";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ListItemLink from "../../components/link";

const classes = {
  list: {
    width: 500,
  },

  buttonLinks: {
    margin: "20px",
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    padding: "2vh 5px",
    color: (theme: any) => theme.palette.primary.main,
    fontWeight: 700,
  },
  link: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
};
const Links = [
  {
    primary: "Albums",
    to: "/albums",
    icon: <PhotoLibrary color={"primary"} />,
  },
  { primary: "Comments", to: "/comments", icon: <Comment color={"primary"} /> },
  { primary: "Photos", to: "/photos", icon: <Photo color={"primary"} /> },
  { primary: "Posts", to: "/posts", icon: <AllInbox color={"primary"} /> },
  {
    primary: "Todos",
    to: "/todos",
    icon: <PlaylistAddCheck color={"primary"} />,
  },
  { primary: "Users", to: "/users", icon: <People color={"primary"} /> },
];

export default function SideBarShared() {
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor: any, open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: any) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Typography variant="h5" sx={classes.title}>
          <Link to="/" color="inherit" component={RouterLink}>
            R,R & J
          </Link>
        </Typography>
        <Divider />
        {Links.map((link) => (
          <div key={link.to}>
            <ListItemLink
              to={link.to}
              primary={link.primary}
              icon={link.icon}
            />
            <Divider />
          </div>
        ))}
      </List>
      <List>
        <Box sx={classes.link}>
          <Button
            variant={"contained"}
            color={"primary"}
            component={"a"}
            target="_blank"
            rel="noopener noreferrer"
            href={"https://github.com/igmrrf/react-redux-jsonplaceholder"}
            sx={classes.buttonLinks}
          >
            Github
          </Button>
        </Box>
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton
          onClick={toggleDrawer("left", true)}
          edge={false}
          color={"inherit"}
          aria-label={"menu"}
        >
          <Menu />
        </IconButton>

        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
