import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch } from "react-redux";
import { addCommentStartAsync } from "../../../views/comments/comments.redux";
import { useAddStyles } from "../../extra/styles/Styles";

function AddCommentModal() {
  const classes = useAddStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    body: "",
    name: "",
    email: "",
  });
  const dispatch = useDispatch();

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
    const { name, email, body } = state;
    event.preventDefault();
    const data = { postId: 1, email, name, body };
    dispatch(addCommentStartAsync(data));
    handleClose();
    setState({
      body: "",
      name: "",
      email: "",
    });
  };

  return (
    <div>
      <Fab
        onClick={handleOpen}
        color={"secondary"}
        className={classes.add}
        aria-label="add"
      >
        <AddIcon />
      </Fab>

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
              Add New Comment
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Name"}
                name={"name"}
                value={state.name}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                label={"Email"}
                name={"email"}
                value={state.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label={"Body"}
                name={"body"}
                value={state.body}
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

export default AddCommentModal;
