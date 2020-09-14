import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { addPhotoStartAsync } from "../redux/photos-redux/photos.actions";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateOutlined from "@material-ui/icons/AddPhotoAlternateOutlined";

const useStyles = makeStyles((theme) => ({
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
    height: "180px",
  },
  add: {
    position: "fixed",
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function AddItemModal({ addPhotoStartAsync }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    title: "",
    thumbnailUrl: "",
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = { ...state };
    addPhotoStartAsync(data);
    handleClose();
    setState({
      title: "",
      thumbnailUrl: "",
    });
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AddPhotoAlternateOutlined
          color={"primary"}
          fontSize={"large"}
          className={classes.add}
        />
      </IconButton>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant={"h5"} component={"h6"}>
              Add New Photo
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Title"}
                name={"title"}
                value={state.title}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label={"Image url"}
                name={"thumbnailUrl"}
                value={state.thumbnailUrl}
                onChange={handleChange}
                fullWidth
              />
              <Button
                onClick={handlePost}
                variant={"contained"}
                color={"secondary"}
                className={classes.button}
              >
                Create
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addPhotoStartAsync: (data) => dispatch(addPhotoStartAsync(data)),
});

export default connect(null, mapDispatchToProps)(AddItemModal);
