import Edit from "@mui/icons-material/Edit";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

import React from "react";
import { useAppDispatch } from "../../../state/hooks";
import { editCommentStartAsync } from "../../../views/comments/comments.redux";
import { useEditStyles } from "../../extra/styles/Styles";
import { IComment } from "../../types";

export default function EditCommentModal({ comment }: { comment: IComment }) {
  const classes = useEditStyles;
  const [open, setOpen] = React.useState(false);
  const [newBody, setNewBody] = React.useState(comment.body);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setNewBody(event.target.value);
  };

  const handlePost = (event: any) => {
    event.preventDefault();
    const data = { ...comment, body: newBody };
    dispatch(editCommentStartAsync(data));
    handleClose();
  };

  return (
    <div>
      <Edit onClick={handleOpen} sx={classes.edit} />
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
              Edit Comment
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"Body"}
                name={"body"}
                value={newBody}
                onChange={handleChange}
                fullWidth
              />
              <Button
                onClick={handlePost}
                variant={"contained"}
                color={"secondary"}
                sx={classes.button}
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
