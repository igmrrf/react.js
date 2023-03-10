import { Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fab from "@material-ui/core/Fab";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "150px",
  },
  add: {
    height: "50px",
    margin: theme.spacing(2),
    marginBottom: theme.spacing(4),
    zIndex: "1000",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function AddModal({ title, resetInput, setInput, thunk, values, Form }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ target: { value, name } }) => {
    setInput({ value, name });
  };

  const handlePost = (event) => {
    console.log("Called");
    console.log({ values });
    event.preventDefault();
    const data = { userId: 1, ...values };
    console.log({ data });
    dispatch(thunk(data));
    handleClose();
    resetInput();
  };

  return (
    <div>
      <Fab onClick={handleOpen} color={"secondary"} aria-label="add">
        <AddIcon />
      </Fab>

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
              {title}
            </Typography>
            <Form
              handlePost={handlePost}
              handleChange={handleChange}
              classes={classes}
              values={values}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddModal;
