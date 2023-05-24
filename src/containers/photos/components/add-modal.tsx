import AddIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { addPhotoStartAsync } from "../../../views/photos/photos.redux";
import { useAddStyles } from "../../extra/styles/Styles";

export default function AddPhotoModal() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    title: "",
    thumbnailUrl: "",
  });
  const dispatch = useAppDispatch();

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
    event.preventDefault();
    const data = { ...state };
    dispatch(addPhotoStartAsync(data));
    handleClose();
    setState({
      title: "",
      thumbnailUrl: "",
    });
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        variant={"contained"}
        color={"secondary"}
        sx={useAddStyles.add}
      >
        Add <AddIcon color={"primary"} fontSize={"small"} />
      </Button>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={useAddStyles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={useAddStyles.paper}>
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
                sx={useAddStyles.button}
              >
                Create
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
