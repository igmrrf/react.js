import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import React from "react";
import { useDispatch } from "react-redux";
import { editCommentStartAsync } from "../../../views/comments/comments.redux";
import { useEditStyles } from "../../extra/styles/Styles";

function TransitionsModal({ comment }) {
  const classes = useEditStyles();
  const [open, setOpen] = React.useState(false);
  const [newBody, setNewBody] = React.useState(comment.body);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setNewBody(event.target.value);
  };

  const handlePost = (event) => {
    event.preventDefault();
    const data = { ...comment, body: newBody };
    dispatch(editCommentStartAsync(data));
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
