import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { addPostStartAsync } from "../redux/posts-redux/posts.actions";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { AddPhotoAlternateOutlined } from "@material-ui/icons";

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
    height: "250px",
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

function AddItemModal({ addPostStartAsync }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = { userId: 1, title, body };
    addPostStartAsync(data);
    handleClose();
    setBody("");
    setTitle("");
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
              New Post
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Title"}
                name={"title"}
                value={title}
                onChange={handleChange}
                fullWidth
                as={"textarea"}
                rows={3}
              />
              <TextField
                label={"Body"}
                name={"body"}
                value={body}
                onChange={handleBody}
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
  addPostStartAsync: (data) => dispatch(addPostStartAsync(data)),
});

export default connect(null, mapDispatchToProps)(AddItemModal);
