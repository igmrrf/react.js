import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import React from "react";
import { useDispatch } from "react-redux";
import { editPhotoStartAsync } from "../../../views/photos/photos.redux";
import { useEditStyles } from "../../extra/styles/Styles";

function TransitionsModal({ photo }) {
  const classes = useEditStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(photo.title);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = { ...photo, title };
    dispatch(editPhotoStartAsync(data));
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
