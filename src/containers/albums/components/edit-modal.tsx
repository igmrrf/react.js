import Edit from "@mui/icons-material/Edit";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../state/hooks";
import { editAlbumStartAsync } from "../../../views/albums/albums.redux";
import { useEditStyles as editStyled } from "../../extra/styles/Styles";
import { IAlbum } from "../../types";

function EditModal({ album }: { album: IAlbum }) {
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(album.title);
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
    const data = { ...album, title: newTitle };
    dispatch(editAlbumStartAsync(data));
    handleClose();
  };

  return (
    <div>
      <Edit color={"primary"} onClick={handleOpen} sx={editStyled.edit} />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={editStyled.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={editStyled.paper}>
            <Typography variant={"h5"} component={"h6"}>
              Edit
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Title"}
                name={"title"}
                value={newTitle}
                onChange={handleChange}
                fullWidth
              />
              <Button
                onClick={handlePost}
                variant={"contained"}
                color={"secondary"}
                sx={editStyled.button}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditModal;
