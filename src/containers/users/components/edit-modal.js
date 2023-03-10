import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import React from "react";
import { useDispatch } from "react-redux";
import { useEditStyles } from "../../../components/styles/Styles";
import { editUserStartAsync } from "../../../views/users/users.redux";

function TransitionsModal({ user }) {
  const classes = useEditStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(user.email);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = { ...user, email };
    dispatch(editUserStartAsync(data));
    handleClose();
  };

  return (
    <div>
      <Edit
        variant={"outlined"}
        color={"primary"}
        onClick={handleOpen}
        className={classes.edit}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
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
                className={classes.button}
              >
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransitionsModal;
