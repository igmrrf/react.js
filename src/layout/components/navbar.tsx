import {
  AppBar,
  Box,
  Button,
  Hidden,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import ListItemLink from "../../components/ListItemLink";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../services/firebase";
import SideBarShared from "./side-bar";

const classes = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "20px",
  },
  title: {
    flexGrow: 1,
  },
  links: {
    border: "2px solid red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "50px",
    textDecoration: "none",
  },
  buttonLinks: {
    margin: "10px 15px",
  },
  link: {
    marginLeft: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    background: "none",
    border: "none",
    color: "white",
  },
};

const Links = [
  { primary: "Albums", to: "/albums" },
  { primary: "Comments", to: "/comments" },
  { primary: "Photos", to: "/photos" },
  { primary: "Posts", to: "/posts" },
  { primary: "Todos", to: "/todos" },
  { primary: "Users", to: "/users" },
];
export default function Navigation() {
  const { currentUser } = useContext(AuthContext);
  console.log({ currentUser });
  const handleSignOut = async () => {
    try {
      const response = await signOut(auth);
      console.log({ response });
    } catch (error: any) {
      console.log({ message: error.message });
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <div style={classes.links}>
            <Button
              variant={"contained"}
              color={"primary"}
              sx={classes.buttonLinks}
              onClick={handleSignOut}
            >
              SignOut
            </Button>
          </div>
          <Typography variant="h5" sx={classes.title}>
            <Link to="/" color="inherit" component={RouterLink}>
              R,R & J
            </Link>
          </Typography>
          <Hidden smDown>
            {Links.map((link, index) => (
              <Paper sx={classes.link} elevation={0} key={index}>
                <ListItemLink primary={link.primary} to={link.to} />
              </Paper>
            ))}

            <div style={classes.links}>
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
            </div>
          </Hidden>
          <Hidden mdUp>
            <SideBarShared />
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
