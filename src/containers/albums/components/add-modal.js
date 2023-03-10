import { Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch } from "react-redux";
import { addAlbumStartAsync } from "../../../views/albums/albums.redux";
import { useAddStyles } from "../../extra/styles/Styles";

function AddAlbumModal() {
  const classes = useAddStyles();
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = { userId: 1, title: newTitle };
    dispatch(addAlbumStartAsync(data));
    handleClose();
    setNewTitle("");
  };

  return (
    <div>
      <Fab onClick={handleOpen} color={"secondary"} aria-label="add">
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
              Add New Album
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Album"}
                name={"album"}
                value={newTitle}
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

export default AddAlbumModal;
