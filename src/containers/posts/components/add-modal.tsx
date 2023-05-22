import AddIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

import React from "react";
import { useDispatch } from "react-redux";
import { addPostStartAsync } from "../../../views/posts/posts.redux";
import { useAddStyles } from "../../extra/styles/Styles";

export default function AddPostModal() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
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
  const handleBody = (event: any) => {
    setBody(event.target.value);
  };

  const handlePost = (event: any) => {
    event.preventDefault();
    const data = { userId: 1, title, body };
    dispatch(addPostStartAsync(data));
    handleClose();
    setBody("");
    setTitle("");
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
              New Post
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Title"}
                name={"title"}
                value={title}
                onChange={handleChange}
                fullWidth
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
