import AddCircleIcon from "@mui/icons-material/AddCircle";
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
import { useAppDispatch } from "../../../hooks/redux";
import { addAlbumStartAsync } from "../../../views/albums/albums.redux";
import { useAddStyles } from "../../extra/styles/Styles";

function AddAlbumModal() {
  const classes = useAddStyles;
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setNewTitle(event.target.value);
  };

  const handlePost = (event: any) => {
    event.preventDefault();
    const data = { userId: 1, title: newTitle };
    dispatch(addAlbumStartAsync(data));
    handleClose();
    setNewTitle("");
  };

  return (
    <div>
      <Fab onClick={handleOpen} color={"secondary"} aria-label="add">
        <AddCircleIcon />
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

export default AddAlbumModal;
