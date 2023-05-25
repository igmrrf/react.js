import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";

import Edit from "@mui/icons-material/Edit";
import React from "react";
import { useAppDispatch } from "../../../state/hooks";
import { editUserStartAsync } from "../../../views/users/users.redux";
import { useEditStyles } from "../../extra/styles/Styles";
import { IUser } from "../../types";

export default function EditUserModal({ user }: { user: IUser }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(user.email);
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePost = (event: any) => {
    event.preventDefault();
    const data = { ...user, email };
    dispatch(editUserStartAsync(data));
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
              Edit E-mail
            </Typography>
            <form onSubmit={handlePost}>
              <TextField
                label={"E-mail"}
                name={"email"}
                value={email}
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
