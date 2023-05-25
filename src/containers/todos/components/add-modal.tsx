import AddIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

import React from "react";
import { useAppDispatch } from "../../../state/hooks";
import { addTodoStartAsync } from "../../../views/todos/todos.redux";
import { useAddStyles } from "../../extra/styles/Styles";
import { ITodo } from "../../types";

export default function AddTodoModal() {
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
    const data: ITodo = { userId: 1, title: newTitle };
    dispatch(addTodoStartAsync(data));
    handleClose();
    setNewTitle("");
  };

  return (
    <div>
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
              Add New Todo
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Todo"}
                name={"todo"}
                value={newTitle}
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
    </div>
  );
}
