import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ListItemLink from "../../containers/components/link";
import SideBarShared from "./side-bar";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: theme.spacing(5),
    textDecoration: "none",
  },
  buttonLinks: {
    margin: theme.spacing(1, 1.5),
  },
  link: {
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    background: "none",
    border: "none",
    color: "white",
  },
}));

const Links = [
  { primary: "Albums", to: "/albums" },
  { primary: "Comments", to: "/comments" },
  { primary: "Photos", to: "/photos" },
  { primary: "Posts", to: "/posts" },
  { primary: "Todos", to: "/todos" },
  { primary: "Users", to: "/users" },
];
export default function Navigation() {
  const classes = useStyles();

  return (
    <AppBar position="sticky" style={{ background: "rgb(18,29,51)" }}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          <Link to="/" color="inherit" component={RouterLink}>
            R,R & J
          </Link>
        </Typography>
        <Hidden smDown>
          {Links.map((link, index) => (
            <Paper className={classes.link} elevation={0} key={index}>
              <ListItemLink primary={link.primary} to={link.to} />
            </Paper>
          ))}

          <div className={classes.links}>
            <Button
              variant={"contained"}
              color={"primary"}
              component={"a"}
              target="_blank"
              rel="noopener noreferrer"
              href={"https://github.com/igmrrf/react-redux-jsonplaceholder"}
              className={classes.buttonLinks}
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
  );
}
