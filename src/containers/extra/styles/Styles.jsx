import { makeStyles } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

export const useAddStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "auto",
  },
  add: {
    height: "50px",
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4),
    zIndex: "1000",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export const useEditStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "150px",
  },
  button: {
    marginTop: theme.spacing(2),
  },
  edit: {
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",
  },
}));

export const useContainerStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  image: {
    height: "20vmin",
    pointerEvents: "none",
  },
  card: {
    padding: theme.spacing(2),
    position: "relative",
  },
  delete: {
    position: "absolute",
    top: "10px",
    left: "10px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  length: {
    fontSize: "16px",
    color: blue,
  },
  edit_Delete: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

