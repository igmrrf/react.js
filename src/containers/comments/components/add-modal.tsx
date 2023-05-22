import AddIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Button,
  Fab,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addCommentStartAsync } from "../../../views/comments/comments.redux";
import { useAddStyles } from "../../extra/styles/Styles";

function AddCommentModal() {
  const classes = useAddStyles;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    body: "",
    name: "",
    email: "",
  });
  const dispatch = useDispatch<any>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handlePost = (event: any) => {
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
        sx={classes.add}
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={classes.paper}>
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
                sx={classes.button}
              >
                Create
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddCommentModal;
