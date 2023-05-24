import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

import Edit from "@mui/icons-material/Edit";
import React from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { editPostStartAsync } from "../../../views/posts/posts.redux";
import { useEditStyles } from "../../extra/styles/Styles";

export default function EditPostModal({ post }: { post: any }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(post.title);
  const [body, setBody] = React.useState(post.body);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleBody = (event: any) => {
    setBody(event.target.value);
  };

  const handlePost = (event: any) => {
    event.preventDefault();
    const data = { ...post, title, body };
    dispatch(editPostStartAsync(data));
    handleClose();
  };

  return (
    <div>
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
                sx={useEditStyles.button}
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
