import AddIcon from "@mui/icons-material/AddCircle";
import { Box, Button, Fade, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../../../state/hooks";
import { addUserStartAsync } from "../../../views/users/users.redux";
import { useAddStyles } from "../../extra/styles/Styles";

export default function AddUserModal() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    username: "",
    name: "",
    phone: "",
    website: "",
  });

  const dispatch = useAppDispatch();
  // const [company, setCompany] = useState({
  //   name: "",
  //   catchPhrase: "",
  //   bs: "",
  // });
  // const [geo, setGeo] = useState({
  //   lat: "",
  //   lng: "",
  // });
  // const [address, setAddress] = useState({
  //   street: "",
  //   suite: "",
  //   city: "",
  //   zipcode: "",
  // });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDetails = (event: any) => {
    setDetails({ ...details, [event.target.name]: event.target.value });
  };
  // const handleCompany = (event:any) => {
  //   setCompany({ ...company, [event.target.name]: event.target.value });
  // };
  // const handleGeo = (event:any) => {
  //   setGeo({ ...geo, [event.target.name]: event.target.value });
  // };
  // const handleAddress = (event:any) => {
  //   setAddress({ ...address, [event.target.name]: event.target.value });
  // };

  const handlePost = (event: any) => {
    event.preventDefault();
    const data = {
      ...details,
      // address: { ...address },
      // geo: { ...geo },
      // company: { ...company },
    };
    dispatch(addUserStartAsync(data));
    handleClose();
    // setAddress({
    //   street: "",
    //   suite: "",
    //   city: "",
    //   zipcode: "",
    // });
    // setGeo({ lat: "", lng: "" });
    // setCompany({ name: "", catchPhrase: "", bs: "" });
    setDetails({
      email: "",
      username: "",
      name: "",
      phone: "",
      website: "",
    });
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
              Add New User
            </Typography>
            <form onSubmit={handlePost}>
              <Typography variant={"h6"} component={"h6"}>
                Details
              </Typography>
              <TextField
                label={"Name"}
                name={"name"}
                value={details.name}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"E-mail"}
                name={"email"}
                value={details.email}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"Username"}
                name={"username"}
                value={details.username}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"Phone"}
                name={"phone"}
                value={details.phone}
                onChange={handleDetails}
                fullWidth
              />
              <TextField
                label={"Website"}
                name={"website"}
                value={details.website}
                onChange={handleDetails}
                fullWidth
              />
              {/*<Typography variant={"h6"} component={"h6"}>*/}
              {/*  Company*/}
              {/*</Typography>*/}
              {/*<TextField*/}
              {/*  label={"Name"}*/}
              {/*  name={"name"}*/}
              {/*  value={company.name}*/}
              {/*  onChange={handleCompany}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Catch Phrase"}*/}
              {/*  name={"catchPhrase"}*/}
              {/*  value={company.catchPhrase}*/}
              {/*  onChange={handleCompany}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"BS"}*/}
              {/*  name={"bs"}*/}
              {/*  value={company.bs}*/}
              {/*  onChange={handleCompany}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<Typography variant={"h6"} component={"h6"}>*/}
              {/*  Address*/}
              {/*</Typography>*/}
              {/*<TextField*/}
              {/*  label={"City"}*/}
              {/*  name={"city"}*/}
              {/*  value={address.city}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Street"}*/}
              {/*  name={"street"}*/}
              {/*  value={address.street}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Suite"}*/}
              {/*  name={"suite"}*/}
              {/*  value={address.suite}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*  label={"Zip Code"}*/}
              {/*  name={"zipcode"}*/}
              {/*  value={address.zipcode}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<Typography variant={"h6"} component={"h6"}>*/}
              {/*  Geo*/}
              {/*</Typography>*/}
              {/*<TextField*/}
              {/*  label={"Latitude"}*/}
              {/*  name={"lat"}*/}
              {/*  value={geo.lat}*/}
              {/*  onChange={handleAddress}*/}
              {/*  fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label={"Latitude"}*/}
              {/*    name={"lat"}*/}
              {/*    value={geo.lat}*/}
              {/*    onChange={handleAddress}*/}
              {/*    fullWidth*/}
              {/*/>*/}
              {/*<TextField*/}
              {/*    label={"Latitude"}*/}
              {/*    name={"lng"}*/}
              {/*    value={geo.lng}*/}
              {/*    onChange={handleAddress}*/}
              {/*    fullWidth*/}
              {/*/>*/}

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
