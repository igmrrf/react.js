import Box from "@material-ui/core/Box";
import blue from "@material-ui/core/colors/blue";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import DeleteForeverRounded from "@material-ui/icons/DeleteForeverRounded";
import Pagination from "@material-ui/lab/Pagination";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SkeletonComponent from "../../containers/components/skeleton.component";
import AddItemModal from "../../containers/users/components/add-modal";
import TransitionsModal from "../../containers/users/components/edit-modal";
import {
  deleteUserStartAsync,
  fetchUsersStartAsync,
  selectUsersData,
  selectUsersErrorMessage,
  selectUsersIsFetching,
} from "./users.redux";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
  },
  userImage: {
    height: "20vmin",
    pointerEvents: "none",
  },
  card: {
    padding: theme.spacing(2),
    position: "relative",
  },
  delete: {
    position: "absolute",
    top: "10px",
    left: "10px",
    cursor: "pointer",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "auto",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  length: {
    fontSize: "16px",
    color: blue,
  },
}));

const UserContainer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const [minimum, setMinimum] = useState(0);
  const [maximum, setMaximum] = useState(10);
  const [pageUsers, setPageUsers] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector(selectUsersData);
  const isFetching = useSelector(selectUsersIsFetching);
  const errorMessage = useSelector(selectUsersErrorMessage);
  const count = Math.ceil(users.length / 10);

  useEffect(() => {
    if (users.length < 1) dispatch(fetchUsersStartAsync());
  }, [dispatch, users]);

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  }, [errorMessage, enqueueSnackbar]);

  useEffect(() => {
    setPageUsers(users.slice(minimum, maximum));
  }, [page, isFetching, users, minimum, maximum]);

  const handleChange = (event, value) => {
    setPage(value);
    setMinimum((value - 1) * 10);
    setMaximum(value * 10);
  };

  return (
    <Box className={classes.root}>
      <Typography variant={"h2"} component={"h1"}>
        Users <strong className={classes.length}> [{users.length}]</strong>
      </Typography>
      <AddItemModal />

      <Grid container justify={"center"} alignItems={"center"} spacing={4}>
        {pageUsers.length > 1 ? (
          pageUsers.map((each) => (
            <Grid item xs={10} sm={5} md={3} key={each.id}>
              <Paper className={classes.card} elevation={10}>
                {each.id}
                <DeleteForeverRounded
                  color={"primary"}
                  className={classes.delete}
                  onClick={() => dispatch(deleteUserStartAsync(each))}
                />

                <Typography>{each.name}</Typography>
                <Typography> {each.username}</Typography>
                <Typography>{each.email}</Typography>
                <Typography>{each.phone}</Typography>
                <Typography>{each.website}</Typography>

                <Box>
                  <TransitionsModal key={each.id} user={each} />
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <SkeletonComponent />
        )}
      </Grid>
      <Pagination
        count={count}
        page={page}
        onChange={handleChange}
        className={classes.pagination}
        color="primary"
        variant="outlined"
        size="small"
      />
    </Box>
  );
};

export default UserContainer;
