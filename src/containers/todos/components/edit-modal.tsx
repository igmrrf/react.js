import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

import Edit from "@mui/icons-material/Edit";
import React from "react";
import { useDispatch } from "react-redux";
import { editTodoStartAsync } from "../../../views/todos/todos.redux";
import { useEditStyles } from "../../extra/styles/Styles";
import { ITodo } from "../../types";

export default function EditTodoModal({ todo }: { todo: ITodo }) {
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(todo.title);
  const dispatch = useDispatch<any>();

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
    const data = { ...todo, title: newTitle };
    dispatch(editTodoStartAsync(data));
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
                value={newTitle}
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
    </div>
  );
}
