import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

import Edit from "@mui/icons-material/Edit";
import React from "react";
import { useDispatch } from "react-redux";
import { editPhotoStartAsync } from "../../../views/photos/photos.redux";
import { useEditStyles } from "../../extra/styles/Styles";
import { IPhoto } from "../../types";

export default function EditPhotoModal({ photo }: { photo: IPhoto }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(photo.title);
  const dispatch = useDispatch<any>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handlePost = (event: any) => {
    event.preventDefault();
    const data = { ...photo, title };
    dispatch(editPhotoStartAsync(data));
    handleClose();
  };

  return (
    <Box>
      <Edit onClick={handleOpen} sx={useEditStyles.edit} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={useEditStyles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={useEditStyles.paper}>
            <Typography variant={"h5"} component={"h6"}>
              Edit
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Title"}
                name={"title"}
                value={title}
                onChange={handleChange}
                fullWidth
              />

              <Button
                onClick={handlePost}
                variant={"contained"}
                color={"secondary"}
                sx={useEditStyles.button}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
